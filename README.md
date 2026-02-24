# API Testing Portfolio with Cypress

Portfolio project focused on API test automation practices using Fake Store API.

## Covered endpoints
- `GET /products`
- `GET /products/:id`
- `GET /products/categories`
- `GET /products?limit=<n>`
- `GET /products?sort=desc`
- `GET /users/:id`
- `GET /carts/user/:id`
- `POST /auth/login`

## Test strategy
- Contract validation with Joi schemas
- Positive and negative scenarios per domain
- Test data centralized in fixtures
- Domain-based organization for specs, requests and contracts

## Reporting
- Mochawesome HTML report generated automatically after test execution
- CI publishes the HTML report as a workflow artifact

## Stack
- Cypress
- JavaScript
- Joi
- Mochawesome

## Install
```bash
npm install
```

## Run tests
```bash
npm run test
```

Run with production config:
```bash
npm run test-prod
```

Open Cypress UI:
```bash
npm run test-open-prod
```
