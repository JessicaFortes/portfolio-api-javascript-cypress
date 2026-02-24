const productsUrl = `${Cypress.config("baseUrl")}/products`;

Cypress.Commands.add("getProducts", (options = {}) => {
  return cy.request({
    method: "GET",
    url: productsUrl,
    ...options
  });
});

Cypress.Commands.add("getProductById", (id, options = {}) => {
  return cy.request({
    method: "GET",
    url: `${productsUrl}/${id}`,
    ...options
  });
});

Cypress.Commands.add("getProductCategories", (options = {}) => {
  return cy.request({
    method: "GET",
    url: `${productsUrl}/categories`,
    ...options
  });
});

Cypress.Commands.add("getProductsWithQuery", (query, options = {}) => {
  return cy.request({
    method: "GET",
    url: productsUrl,
    qs: query,
    ...options
  });
});
