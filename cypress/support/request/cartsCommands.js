const cartsUrl = `${Cypress.config("baseUrl")}/carts`;

Cypress.Commands.add("getCartsByUserId", (userId, options = {}) => {
  return cy.request({
    method: "GET",
    url: `${cartsUrl}/user/${userId}`,
    ...options
  });
});
