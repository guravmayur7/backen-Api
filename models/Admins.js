//import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import crypto from "crypto";

const adminSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
  },
  hash: String,
  salt: String,
  access_type: Number,
});

// Method to set salt and hash the password for a user
adminSchema.methods.setPassword = function (password) {
  // Creating a unique salt for a particular user
  this.salt = crypto.randomBytes(16).toString("hex");

  // Hashing user's salt and password with 1000 iterations,

  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

// Method to check the entered password is correct or not
adminSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.hash === hash;
};

const Admin = mongoose.model("admins", adminSchema);
export default Admin;
