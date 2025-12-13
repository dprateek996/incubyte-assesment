const request = require("supertest");
const app = require("../app");
const prisma = require("../db");

it("should log in a user and return a token", async () => {
  const email = `login_${Date.now()}@example.com`;

  await request(app)
    .post("/api/auth/register")
    .send({
      email,
      password: "secret123"
    });

  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email,
      password: "secret123"
    });

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("token");

  // cleanup
  await prisma.user.deleteMany({ where: { email } });
});

afterAll(async () => {
  await prisma.$disconnect();
});
