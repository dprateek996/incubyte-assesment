const request = require("supertest");
const app = require("../app");

let token;

beforeAll(async () => {

    await request(app)
    .post("/api/auth/register")
    .send({
      email: "sweetuser@example.com",
      password: "password123"
    });

    const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "sweetuser@example.com",
      password: "password123"
    });

  token = res.body.token;
});

it("should add a new sweet", async () => {
  const res = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Gulab Jamun",
      category: "Indian Sweet",
      price: 10,
      quantity: 20
    });

  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty("id");
  expect(res.body.name).toBe("Gulab Jamun");
});

it("should list all sweets", async () => {
  const res = await request(app)
    .get("/api/sweets")
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBeGreaterThan(0);
});
it("should delete a sweet by id", async () => {
  
  const listRes = await request(app)
    .get("/api/sweets")
    .set("Authorization", `Bearer ${token}`);

  const sweetId = listRes.body[0].id;

  const res = await request(app)
    .delete(`/api/sweets/${sweetId}`)
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("message", "Sweet deleted successfully");
});