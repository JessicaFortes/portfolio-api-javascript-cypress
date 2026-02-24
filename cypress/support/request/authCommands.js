const authLoginUrl = `${Cypress.config("baseUrl")}/auth/login`;

Cypress.Commands.add("login", (credentials, options = {}) => {
  return cy.request({
    method: "POST",
    url: authLoginUrl,
    body: credentials,
    ...options
  });
});
