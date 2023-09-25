const User = require("../../../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

describe("User Generate Auth Token", () => {
  it("should return a valid JWT", async () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
    };
    const user = new User();
    const { accessToken, refreshToken } = await user.getJWTToken();
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    expect(decoded).toMatchObject(payload);
  });
});
