const mongoose = require("mongoose");
const crypto = require("node:crypto");

// 1. make a schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  salt: {
    type: String,
    required: false,
    // if we want to use default values
    // we can't use required, so it must be false
    default: () => {
      return crypto.randomBytes(64).toString("hex");
    },
  },
});

// do not use arrow functions here
UserSchema.pre("save", function(request, response, next){ // arrow functions break 'this' keyword
  // mongoose middleware
  if (!this.salt) {
    this.salt = crypto.randomBytes(64).toString("hex");
  }

  // if the password was not modified, skip this middleware
  if (!this.isModified("password")) return next();

  // else we can assume the password was modified,
  // so we must hash and salt the password
  console.log("User password was modified, hashing and salting it now!");

  // use crypto's scryptSync function to encrypt the password and combine with sale

  this.password = crypto
    .scryptSync(this.password, this.salt, 64)
    .toString("hex");
  // keep calling toString("hex") to save the data in a file friendly format
  // otherwise it's saved as a byte buffer

  // next(); understand why this isn't working
});

UserSchema.methods.comparePassword = function (incomingPasswordToCheck) {
  // ensure that a user has a salt
  if (!this.salt) {
    // if there is no salt available for the user, make on
    this.salt = crypto.randomBytes(64).toString("hex");
  }

  // has and salt the incomingPasswordToCheck

  // if the hash and salt process works correctly,
  // the provided password will generate the same result
  // as the saved hashed and salted password

  let hashedAndSaltedIncomingPassword = crypto
    .scryptSync(incomingPasswordToCheck, this.salt, 64)
    .toString("hex");

  let passwordsDoMatch = this.password == hashedAndSaltedIncomingPassword;
  return passwordsDoMatch
};

// 2. use the schema above to make a model
const UserModel = mongoose.model("User", UserSchema);

module.exports = {
  UserSchema,
  UserModel,
};
