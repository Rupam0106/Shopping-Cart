const User = require("../models/userModel");
const request = require("supertest");
let server;
let token, userToken;
const MongoClient = require("mongodb").MongoClient;
const LOADER_URI =
  "mongodb+srv://rupam0106:rupam%400106@cluster0.hhddnzi.mongodb.net";

//DATABASE-CONNECTION
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

beforeEach(async () => {
  server = require("../server");
});
afterEach(async () => {
  await server.close();
});

// USER-AUTH API TESTING
describe("USER-AUTH API TESTING ", () => {
  describe("POST", () => {
    // user Register
    it.skip("should return 201 if user created", async () => {
      response = await request(server).post("/api/v1/register").send({
        name: "Rupam Gupta",
        email: "test@gmail.com",
        password: "123456789",
      });
      expect(response.status).toBe(201);
    }, 7000);

    // USER LOGIN
    it("should return 200 if email and password is correct", async () => {
      const user = new User();
      const { accessToken, refreshToken } = await user.getJWTToken();
      const response = await request(server).post("/api/v1/login").send({
        email: "rupam@gmail.com",
        password: "12345678",
      });
      token = response.body?.refreshToken;
      userToken = response.body?.accessToken;
      expect(response.status).toBe(200);
    }, 8000);

    // USER NOT FOUND
    it("should return 404 if email is not exist", async () => {
      const response = await request(server).post("/api/v1/auth/login").send({
        email: "rupam1123@gmail.com",
        password: "12345678",
      });
      expect(response.status).toBe(404);
    }, 8000);

    // INCORRECT-PASSWORD
    it("should return 400 if password is incorrect", async () => {
      const response = await request(server).post("/api/v1/login").send({
        email: "rupam@gmail.com",
        password: "Wrong@123",
      });
      expect(response.status).toBe(401);
    }, 8000);

    // LOGIN HEADER VALIDATION
    it("should return 200 after login set", async () => {
      const response = await request(server).post("/api/v1/login").send({
        email: "rupam@gmail.com",
        password: "12345678",
      });
      token = response.body?.accessToken;
      userToken = response.body?.refreshToken;
      expect(response.headers["authorization"].toString()).toBe(`${userToken}`);
      expect(response.headers["set-cookie"].toString()).toBe(
        `refreshToken=${token}; Path=/`
      );
      expect(response.status).toBe(200);
    }, 8000);

    // FORGOT-PASSWORD
    it("should return 200 if forgot password done", async () => {
      // const resetToken = user.getResetPasswordToken();
      const response = await request(server)
        .post("/api/v1/password/forgot")
        .set("authorization", userToken)
        .set("set-cookie", `refreshToken=${token} Path=/`)
        .send({
          email: "rupam@gmail.com",
        });
      expect(response.status).toBe(200);
      // expect(resetToken).toBe(resetToken);
    }, 8000);

    //LOGOUT USER
    it.skip("should return 200 when user Logout", async () => {
      const response = await request(server)
        .get("/api/v1/logout")
        .set("authorization", userToken)
        .set("refreshToken", `refreshToken=${token}`);
      expect(response.status).toBe(200);
    }, 8000);
  });
});
