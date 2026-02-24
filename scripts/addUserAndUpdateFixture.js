const fs = require("fs");
const path = require("path");

const FIXTURE_PATH = path.resolve(__dirname, "..", "cypress", "fixtures", "testData.json");
const USERS_ENDPOINT = "https://fakestoreapi.com/users";

const dynamicEmail = `teste-${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}@qa.com.br`;

const defaultUserPayload = {
  email: dynamicEmail,
  username: `job_user_${Date.now()}`,
  password: "job_password_123",
  name: {
    firstname: "Job",
    lastname: "User"
  },
  address: {
    city: "Sao Paulo",
    street: "Automation Street",
    number: 100,
    zipcode: "01001-000",
    geolocation: {
      lat: "-23.5505",
      long: "-46.6333"
    }
  },
  phone: "11999999999"
};

async function run() {
  const fixtureRaw = fs.readFileSync(FIXTURE_PATH, "utf8");
  const fixture = JSON.parse(fixtureRaw);

  const payload = fixture.users?.newUserTemplate || defaultUserPayload;

  const response = await fetch(USERS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Failed to create user. Status: ${response.status}. Body: ${body}`);
  }

  const createdUser = await response.json();

  fixture.users = {
    ...fixture.users,
    lastCreatedUser: createdUser,
    lastCreatedCredentials: {
      username: payload.username,
      password: payload.password,
      email: payload.email
    },
    lastCreatedAt: new Date().toISOString()
  };

  fixture.auth = {
    ...fixture.auth,
    dynamicCredentials: {
      username: payload.username,
      password: payload.password
    }
  };

  fs.writeFileSync(FIXTURE_PATH, `${JSON.stringify(fixture, null, 2)}\n`, "utf8");

  console.log("User created and fixture updated successfully.");
  console.log(`New user id: ${createdUser.id}`);
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
