const User = require("../models/userModel");
const request = require("supertest");
let server;
let data;
let user;
let token, userToken;

beforeEach(async () => {
  server = require("../server");
  address = {
    house: "944",
    street: "Chitrakut",
    city: "Umbergaon",
    state: "Gujarat",
    pincode: 396170,
  };
  shippindAddress = {
    name: "Rupam",
    phone: 8460980143,
    address,
  };
  orderDetails = {
    totalItems: 1,
    totalPrice: 1,
    products: [],
    shippindAddress,
  };
  data = {
    userId: "64ec2da08190aae898c6dd77",
    orderDetails,
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

// ORDER ROUTE TESTING
describe("ORDER API TESTING", () => {
  describe("POST", () => {
    // CREATE ORDER
    it("should return 200 if cart created", async () => {
      response = await request(server)
        .post("/api/v1/order")
        .set("authorization", userToken)
        .set("set-cookie", `refreshToken=${token} Path=/`)
        .send(data);
      expect(response.status).toBe(200);
    }, 8000);
  });

  //UPDATE ORDER
  describe("PUT", () => {
    it("should return 200 if order updated", async () => {
      response = await request(server)
        .put("/api/v1/order")
        .set("authorization", userToken)
        .set("set-cookie", `refreshToken=${token} Path=/`)
        .send(data);
      expect(response.status).toBe(200);
    }, 8000);
  });

  //GET ORDER
  describe("GET", () => {
    it("should return 200 if get the order", async () => {
      response = await request(server)
        .get("/api/v1/order")
        .set("authorization", userToken)
        .set("set-cookie", `refreshToken=${token} Path=/`);
      expect(response.status).toBe(200);
    }, 8000);
  });

  // CANCEL ORDER
  describe("PUT", () => {
    it("should return 200 when order is canceled", async () => {
      response = await request(server)
        .put("/api/v1/order")
        .set("authorization", userToken)
        .set("set-cookie", `refreshToken=${token} Path=/`);
      expect(response.status).toBe(200);
    }, 8000);
  });
});
