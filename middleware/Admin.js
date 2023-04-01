import Jwt from "jsonwebtoken";
import commonConstant from "./../constants/common.js";
const jwtAdminKey = commonConstant.jwtAdminKey;

export const verifyAdminToken = async (req, resp, next) => {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtAdminKey, async (err, valid) => {
      if (err) {
        return await resp.status(498).send({ message: "invalid token found" });
        //await resp.send({ result: "invalid token found" }); //498
      } else {
        await next();
      }
    });
  } else {
    // await resp.send({ result: "token not found in request header" });
    return await resp
      .status(498)
      .send({ message: "token not found in request header" });
  }
};
