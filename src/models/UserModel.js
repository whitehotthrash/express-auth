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
    }
  }
});

UserSchema.pre("save", () => {
  if (!this.salt) {
    this.salt = crypto.randomBytes(64).toString("hex");
  }

  // if the password was not modified, skip this middleware
  if (!this.isModified("password")) return next();

  // else we can assume the password was modified,
  // so we must hash and salt the password
  console.log("User password was modified, hashing and salting it now!")

  // use crypto's scryptSync function to encrypt the password and combine with sale

  this.password = crypto.scryptSync(this.password, this.salt, 64).toString("hex");
  // keep calling toString("hex") to save the data in a file friendly format
  // otherwise it's saved as a byte buffer

  next();
});

// 2. use the schema above to make a model
const UserModel = mongoose.model("User", UserSchema);

module.exports = {
  UserSchema,
  UserModel,
};
