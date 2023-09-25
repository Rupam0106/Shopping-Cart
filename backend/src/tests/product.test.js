const User = require("../models/userModel");
const request = require("supertest");
let server;
let data;
let user;
let token, userToken;

beforeEach(async () => {
  server = require("../server");
  data = {
    title: "Canon C50",
    description: "rupam@gmail.com",
    price: 100,
    productImage: "https://unsplash.com/photos/Z55YG0Kzg3g",
    stock: 100,
  };
});
afterEach(async () => {
  await server.close();
});

describe("USER AUTH-API TESTING ", () => {
  describe("POST-LOGIN ", () => {
    // USER LOGIN
    it("should return 200 if email and password is correct", async () => {
      user = new User();
      const { accessToken, refreshToken } = await user.getJWTToken();
      const response = await request(server).post("/api/v1/login").send({
        email: "rupam@gmail.com",
        password: "12345678",
      });
      token = response.body?.refreshToken;
      userToken = response.body?.accessToken;
      expect(response.status).toBe(200);
    }, 8000);
  });
});

// PRODUCT-API TESTING
describe("PRODUCT-API TESTING", () => {
  describe("POST", () => {
    // PRODUCT CREATE
    // TODO :add the admin role
    it.skip("should return 201 if product created", async () => {
      response = await request(server)
        .post("/api/v1/product/new")
        .set("authorization", userToken)
        .set("set-cookie", `refreshToken=${token} Path=/`)
        .send(data);
      expect(response.status).toBe(201);w
    }, 8000);
  });

  //GET ALL PRODUCT
  describe("GET All PRODUCTS", () => {
    it("should return 200 if get All Products", async () => {
      const response = await request(server).get("/api/v1/products");
      expect(response.status).toBe(200);
    }, 8000);
  });
});
