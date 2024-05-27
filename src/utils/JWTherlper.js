import jwt from "jsonwebtoken";

export const JWThelper = {
  generateJWT: (user) => {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return token;
  },
  verifyJWT: (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  },
};
