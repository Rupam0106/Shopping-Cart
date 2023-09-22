const User = require("../../models/userModel");
let token, userToken;

const authToken = async () => {
  const user = new User();
  const { accessToken, refreshToken } = await user.getJWTToken();
  token = response.body?.refreshToken;
  userToken = response.body?.accessToken;
  return { token, userToken };
};

module.exports = authToken;
