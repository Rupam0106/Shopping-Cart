const User = require("../../../models/userModel");
const auth = require("../../../middlewares/auth");
const mongoose = require("mongoose");

describe("auth middleware", () => {
  it("should populate req.user with the payload of a valid JWT", async () => {
    const userPayload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
    };
    const user = new User();
    const { accessToken, refreshToken } = await user.getJWTToken();
    console.log(refreshToken)
    const req = {
      header: jest.fn().mockReturnValue(refreshToken),
    };
    const res = {};
    const next = jest.fn();

    auth(req, res, next);

    expect(req.userPayload).toContain(userPayload);
  });
});
