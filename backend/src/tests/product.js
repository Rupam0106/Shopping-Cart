const User = require("../models/userModel");
const Product = require("../models/productModel");
const request = require("supertest");
let server;
let user;
let data;

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

// Products-testing
describe("product api testing", () => {
  describe("POST", () => {
    // it("should return 201 if product created", async () => {
    //   response = await request(server).post("/api/v1/product/new").send(data);
    //   expect(response.status).toBe(201);
    // }, 8000);
  });

  describe("GET", () => {
    it("should return 200 if get All Products", async () => {
      const response = await request(server).post("/api/v1/products");
      expect(response.status).toBe(200);
    }, 8000);
  });
});
