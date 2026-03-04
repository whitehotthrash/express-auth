const jwt = require("jsonwebtoken");

// Function to create JWTs
function generateJwt(targetUser) {
  // generate a JWT that lasts 7 days and contains the targetUser.id
  let newJwt = jwt.sign(
    // first arg is payload of custom token data
    {
      userId: targetUser.id,
    },
    // secret key
    process.env.JWT_SECRET_KEY,
    {// third arg is payload of jwt-specification specific data, such as expiresIn
      expiresIn: "7d",
    },
  );
  return newJwt;
}
// Function to validate or verify a JWT
function verifyJwt(targetJwt) {
  // verify the JWT to make sure it came from our system AND is still valid / has not expired
}
module.exports = {
  generateJwt,
  verifyJwt,
};
