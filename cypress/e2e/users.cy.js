import { userSchema } from '../support/contract/usersContract'
import testData from '../fixtures/testData.json'

describe('Fake Store API - Users', () => {
  it('[GET /users/:id] Validate a single user contract', () => {
    cy.getUserById(testData.users.validUserId).then((response) => {
      expect(response.status).to.equal(200);
      const { error } = userSchema.validate(response.body, { abortEarly: false });
      expect(error, error?.details?.map((detail) => detail.message).join(' | ')).to.be.undefined;
      expect(response.body.id).to.equal(testData.users.validUserId);
    });
  });

  it('[GET /users/:id] Return 400 for invalid user id format (negative)', () => {
    cy.getUserById(testData.users.invalidUserIdFormat, { failOnStatusCode: false }).then((response) => {
      expect(response.status).to.equal(400);
    });
  });
});
