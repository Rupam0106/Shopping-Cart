const User = require("../models/userModel");
const request = require("supertest");
let server;
let data;
let user;
let token, userToken;
let items;

beforeEach(async () => {
  server = require("../server");
  items = [{ productId: "650c2d13e6e25c0fdf978d75", quantity: 1 }];
  data = {
    userId: "64ec2da08190aae898c6dd77",
    cartItems: items,
    totalPrice: 100,
    totalItems: 1,
  };
});
afterEach(async () => {
  await server.close();
});

describe("USER API TESTING ", () => {
  describe("POST - LOGIN ", () => {
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

// CART ROUTE TESTING
describe("CART API TESTING", () => {
  describe("POST", () => {
    // CREATE CART
    it("should return 200 if cart created", async () => {
      response = await request(server)
        .post("/api/v1/cart")
        .set("authorization", userToken)
        .set("set-cookie", `refreshToken=${token} Path=/`)
        .send(data);
      expect(response.status).toBe(200);
    }, 8000);
  });

  //UPDATE CART
  describe("PUT", () => {
    it("should return 200 if cart updated", async () => {
      response = await request(server)
        .put("/api/v1/cart")
        .set("authorization", userToken)
        .set("set-cookie", `refreshToken=${token} Path=/`)
        .send({ productId: "650c2d13e6e25c0fdf978d75", quantity: 1 });
      expect(response.status).toBe(200);
    }, 8000);
  });

  //GET PARTICULAR CART DETAILS
  describe("GET", () => {
    it("should return 200 if get the cart", async () => {
      response = await request(server)
        .get("/api/v1/cart")
        .set("authorization", userToken)
        .set("set-cookie", `refreshToken=${token} Path=/`);
      expect(response.status).toBe(200);
    }, 8000);
  });
});
