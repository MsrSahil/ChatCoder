import jwt from "jsonwebtoken";

export const genAuthToken = (user) => {
  const Token =  jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return Token;
};