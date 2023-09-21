const User = require("../models/userModel");
const request = require("supertest");
let server;
let user;
let data;
let token, userToken;
const MongoClient = require("mongodb").MongoClient;
const LOADER_URI =
  "mongodb+srv://rupam0106:rupam%400106@cluster0.hhddnzi.mongodb.net";

//database-connection
describe("IntegrationTest", () => {
  let connection;

  beforeAll(async () => {
    connection = await MongoClient.connect(LOADER_URI);
  });

  afterAll(async () => {
    await connection.close();
  });

  test("Test", async () => {
    await connection.db("test");
  });
});
// user-authentication
beforeEach(async () => {
  server = require("../server");
});
afterEach(async () => {
  await server.close();
});

// login-test
describe("perform the login & Creation of User ", () => {
  describe("POST- for user Creation", () => {
    it("should return 201 if user created", async () => {
      response = await request(server).post("/api/v1/register").send({
        name: "Rupam Gupta",
        email: "test2@gmail.com",
        password: "123456789",
      });
      expect(response.status).toBe(201);
    }, 7000);

    it("should return 200 if email and password is correct", async () => {
      const userData = new User();
      const { accessToken, refreshToken } = await userData.getJWTToken();
      const response = await request(server)
        .post("/api/v1/login")
        .set("Authorization", accessToken)
        .set("Set-Cookie", refreshToken)
        .send({
          email: "rupam@gmail.com",
          password: "12345678",
        });
      token = response.body?.refreshToken;
      userToken = response.body?.accessToken;
      expect(response.headers["Authorization"]).toBe(`${userToken}`);
      expect(response.headers["Set-Cookie"]).toBe(`${token}`);
      expect(response.status).toBe(200);
    }, 8000);

    it("should return 404 if email is not exist", async () => {
      const response = await request(server).post("/api/v1/auth/login").send({
        email: "rupam1123@gmail.com",
        password: "12345678",
      });
      expect(response.status).toBe(404);
    });

    it("should return 400 if password is incorrect", async () => {
      const response = await request(server).post("/api/v1/login").send({
        email: "rupam@gmail.com",
        password: "Wrong@123",
      });
      expect(response.status).toBe(401);
    });

    it("should return 200 after login set", async () => {
      const response = await request(server).post("/api/v1/login").send({
        email: "rupam@gmail.com",
        password: "12345678",
      });
      token = response.body.token;
      expect(response.status).toBe(200);
    });
  });
});

module.exports = token;
