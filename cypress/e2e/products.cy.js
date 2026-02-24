import productListSchema, { productItemSchema } from '../support/contract/productsContract'
import productsActions from '../support/utils/productsActions'
import testData from '../fixtures/testData.json'

describe('Fake Store API - Products', () => {
  it('[GET /products] Validate products endpoint contract', () => {
    cy.getProducts().then((response) => {
      expect(response.status).to.equal(200);
      const { error } = productListSchema.validate(response.body, { abortEarly: false });
      expect(error, error?.details?.map((detail) => detail.message).join(' | ')).to.be.undefined;
      cy.log('List of products:');
      cy.log(response.body);
    });
  });

  it('[GET /products] Get list of electronic products', () => {
    cy.getProducts().then((response) => {
      expect(response.status).to.equal(200);
      const electronicProducts = productsActions.getProductsByCategory(response.body, testData.products.category);
      expect(electronicProducts.length).to.be.at.least(testData.products.minElectronicProducts);
      electronicProducts.forEach((product) => {
        expect(product).to.have.property('rating');
        expect(product.rating).to.have.property('rate');
        expect(product.rating.rate).to.be.a('number');
      });
      cy.log('List of electronic products:');
      cy.log(electronicProducts);
    });
  });

  it('[GET /products] Validate quantity of electronic products with rating.rate > 4', () => {
    cy.getProducts().then((response) => {
      expect(response.status).to.equal(200);
      const countProduct = response.body.filter((product) =>
        product.category === 'electronics' &&
        product.rating &&
        typeof product.rating.rate === 'number' &&
        product.rating.rate > 4
      ).length;
      expect(countProduct).to.be.at.least(testData.products.minElectronicProductsWithRateAbove4);
    });
  });

  it('[GET /products/:id] Validate a single product contract', () => {
    cy.getProductById(testData.products.validProductId).then((response) => {
      expect(response.status).to.equal(200);
      const { error } = productItemSchema.validate(response.body, { abortEarly: false });
      expect(error, error?.details?.map((detail) => detail.message).join(' | ')).to.be.undefined;
      expect(response.body.id).to.equal(testData.products.validProductId);
    });
  });

  it('[GET /products/categories] Validate available categories', () => {
    cy.getProductCategories().then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array').and.not.to.be.empty;
      expect(response.body).to.include(testData.products.category);
    });
  });

  it('[GET /products?limit=5] Return the requested amount of products', () => {
    cy.getProductsWithQuery({ limit: testData.products.limit }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array').and.to.have.length(testData.products.limit);
    });
  });

  it('[GET /products?sort=desc] Return products sorted by id in descending order', () => {
    cy.getProductsWithQuery({ sort: testData.products.sort }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array').and.not.to.be.empty;
      const ids = response.body.map((product) => product.id);
      const sortedDesc = [...ids].sort((a, b) => b - a);
      expect(ids).to.deep.equal(sortedDesc);
    });
  });
});
