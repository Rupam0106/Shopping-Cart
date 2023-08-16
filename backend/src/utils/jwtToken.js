let localUser;
 const getUserId = () => {
  return localUser; 
};

// Create Token and saving in cookie
const sendToken = (user, statusCode, res) => {
  let { accessToken, refreshToken } = user.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(new Date().getTime() + 5 * 60 * 1000),
    httpOnly: true, // accessible only web server
  };
  localUser=user._id;
  res
    .status(statusCode)
    .cookie("refreshToken", refreshToken, options)
    .header("Authorization", refreshToken)
    .json({
      success: true,
      user,
      accessToken,
      refreshToken,
    });
};

module.exports = {sendToken,getUserId};
