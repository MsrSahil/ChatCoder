import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const Protect = async (req, res, next) => {
  try {
    const token =
      req.headers["authorization"]?.split(" ")[1] || req.cookies.IDCard || "";

    if (!token) {
      const error = new Error("Unauthorized");
      error.StatusCode = 401;
      return next(error);
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const verifiedUser = await User.findById(decode.id);
    if (!verifiedUser) {
      const error = new Error("Unauthorized");
      error.StatusCode = 401;
      return next(error);
    }

    req.user = verifiedUser;
    next()
  } catch (error) {
    next(error);
  }
};