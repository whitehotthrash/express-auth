const express = require("express");
const { UserModel } = require("../models/UserModel");
const { generateJwt } = require("../utils/jwtFunctions"); 
const { verifyLoginMiddleware } = require("../middleware/jwtMiddleware");
const router = express.Router();

// User router/controller
// localhost:3000/users/
router.get("/", async (request, response) => {
  let results = await UserModel.find({});
  response.json({
    results: results,
  });
});

router.post("/", async (request, response) => {
  let { email, password } = request.body;

  let newUserResult = await UserModel.create({
    email: email,
    password: password,
  });

  response.json({
    result: newUserResult,
  });
});

// POST localhost:3000/users/login
router.post("/login", async (request, response) => {
  let { email, password } = request.body;

  // find the user by their email
  let foundUser = await UserModel.findOne({ email: email });

  // compare the found user's hashed and salted password to the provided password
  let doPasswordsMatch = foundUser.comparePassword(password);

  // if the comparison succeeds, the user can be logged in
  let pretendJwtHere = doPasswordsMatch
    ? "jwt.goes.here"
    : "passwords do not match";

  // // TODO: JWTs

  let resultJwt = generateJwt(foundUser)

  response.json({
    result: resultJwt,
  });
});

router.get("/protectedRoute", verifyLoginMiddleware, (request, response) => {
  response.json({
    message: "You are logged in."
  })
})

module.exports = router;
