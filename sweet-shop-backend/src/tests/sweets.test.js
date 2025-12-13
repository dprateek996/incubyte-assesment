const request = require("supertest");
const app = require("../app");
const prisma = require("../db");

let token;
let email;
let sweetName;

beforeAll(async () => {
  email = `sweetuser_${Date.now()}@example.com`;

  await request(app)
    .post("/api/auth/register")
    .send({
      email,
      password: "password123"
    });

  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email,
      password: "password123"
    });

  token = res.body.token;
});

it("should add a new sweet", async () => {
  sweetName = `Gulab Jamun ${Date.now()}`;

  const res = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: sweetName,
      category: "Indian Sweet",
      price: 10,
      quantity: 20
    });

  expect(res.statusCode).toBe(201);
});

it("should list all sweets", async () => {
  const res = await request(app)
    .get("/api/sweets")
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBeGreaterThan(0);
});

it("should delete a sweet by id", async () => {
  const listRes = await request(app)
    .get("/api/sweets")
    .set("Authorization", `Bearer ${token}`);

  expect(listRes.body.length).toBeGreaterThan(0);

  const target = listRes.body.find((s) => s.name === sweetName) || listRes.body[0];
  const sweetId = target.id;

  const res = await request(app)
    .delete(`/api/sweets/${sweetId}`)
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("message", "Sweet deleted successfully");
});

afterAll(async () => {
  // cleanup only what we created
  if (sweetName) {
    await prisma.sweet.deleteMany({ where: { name: sweetName } });
  }
  if (email) {
    await prisma.user.deleteMany({ where: { email } });
  }
  await prisma.$disconnect();
});
