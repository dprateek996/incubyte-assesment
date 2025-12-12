const request = require("supertest");
const app = require("../app");

it("should log in a user and return a token", async () => {
  // First register a user
  await request(app)
    .post("/api/auth/register")
    .send({
      email: "login@example.com",
      password: "secret123"
    });

  // Then try to log in
  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "login@example.com",
      password: "secret123"
    });

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("token");
});