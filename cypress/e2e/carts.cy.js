import testData from '../fixtures/testData.json'

describe('Fake Store API - Carts', () => {
  it('[GET /carts/user/:id] Validate carts payload for a user', () => {
    cy.getCartsByUserId(testData.carts.validUserId).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      response.body.forEach((cart) => {
        expect(cart).to.have.property('id');
        expect(cart).to.have.property('userId', testData.carts.validUserId);
        expect(cart).to.have.property('date');
        expect(cart).to.have.property('products');
        expect(cart.products).to.be.an('array');
      });
    });
  });

  it('[GET /carts/user/:id] Return 400 for invalid user id format (negative)', () => {
    cy.getCartsByUserId(testData.carts.invalidUserIdFormat, { failOnStatusCode: false }).then((response) => {
      expect(response.status).to.equal(400);
    });
  });
});
