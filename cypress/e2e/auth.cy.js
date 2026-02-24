import { loginSuccessSchema } from '../support/contract/authContract'
import testData from '../fixtures/testData.json'

describe('Fake Store API - Auth', () => {
  it('[POST /auth/login] Return token for valid credentials', () => {
    cy.login(testData.auth.validCredentials).then((response) => {
      expect(response.status).to.equal(200);
      const { error } = loginSuccessSchema.validate(response.body, { abortEarly: false });
      expect(error, error?.details?.map((detail) => detail.message).join(' | ')).to.be.undefined;
    });
  });

  it('[POST /auth/login] Reject invalid credentials (negative)', () => {
    cy.login(testData.auth.invalidCredentials, { failOnStatusCode: false }).then((response) => {
      expect(response.status).to.be.oneOf([400, 401]);
    });
  });
});
