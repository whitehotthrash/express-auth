const { verifyJwt } = require("../utils/jwtFunctions");

function verifyLoginMiddleware(request, response, next) {
  let bearerToken = request.headers["authorization"];
  console.log(request.headers);

  bearerToken = bearerToken.substring(7)
  console.log(bearerToken)

  try {
    let decodedToken = verifyJwt(bearerToken);
    // if no error thrown by this
    // user is logged in
    next();
  } catch (error) {
    response.json({
      message: "You are not logged in",
    });
  }
}


module.exports = {
  verifyLoginMiddleware
}