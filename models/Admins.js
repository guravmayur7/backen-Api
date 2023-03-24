import { Schema, model } from "mongoose";

const adminSchema = new Schema({
  email: String,
  password: String,
  access_type: Number,
});

module.exports = model("admins", adminSchema);
