import adminModel from "../models/Admins.js";
import jwt from "jsonwebtoken";
const jwtAdminKey = "DspBMno166";

export const login = async (request, response) => {
  try {
    const admin = await adminModel.findOne({ email: request.body.email });
    if (admin) {
      if (admin.validPassword(request.body.password)) {
        jwt.sign({ admin }, jwtAdminKey, { expiresIn: "2h" }, (err, token) => {
          if (err) {
            return response
              .status(400)
              .send({ message: "Something went wrong" });
          }
          return response
            .status(200)
            .send({ email: admin.email, authToken: token });
        });
      } else {
        return response.status(400).send({
          message: "Wrong Password",
        });
      }
    } else {
      return response.status(204).send({ message: "User not found" });
    }
  } catch (error) {
    return response.status(402).send({ message: error.message });
  }
};

export const signUp = async (request, response) => {
  try {
    let admin = new adminModel();
    admin.email = request.body.email;
    admin.name = request.body.name;
    admin.setPassword(request.body.password);

    const res = await admin.save();
    if (res) {
      return response.status(201).send({
        email: admin.email,
        message: "User added successfully",
      });
    } else {
      return response.staus(400).send({ message: "Failed to add admin user" });
    }
  } catch (error) {
    return response.status(402).send({ message: error.message });
  }
};
