const usersUrl = `${Cypress.config("baseUrl")}/users`;

Cypress.Commands.add("getUserById", (id, options = {}) => {
  return cy.request({
    method: "GET",
    url: `${usersUrl}/${id}`,
    ...options
  });
});
