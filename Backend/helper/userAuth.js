import handleError from "./handleError.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Middleware to verify user authentication using JWT token
export const verifyUser = async (req, res, next) => {
  const token = req.cookies.token;
  // console.log("Token from cookies:", token); Log the token for debugging
  if (!token) {
    return next(new handleError("Access Denied please login first", 401));
  }
  const decodedData =  jwt.verify(token, process.env.JWT_SECRET);
// console.log("Decoded Data:", decodedData); 
  req.user = await User.findById(decodedData.id); 
//   console.log("User Data:", req.user); 
  next();
};

// middleware to role based authorization
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new handleError("Access Denied", 403));
    }
    next();
  };
};
