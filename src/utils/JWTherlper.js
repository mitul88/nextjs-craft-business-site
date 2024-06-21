import { jwtVerify, SignJWT } from "jose";

export const JWThelper = {
  generateJWT: async (user) => {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer(process.env.JWT_ISSUER)
      .setExpirationTime(process.env.JWT_EXPIRATION_TIME)
      .sign(secret);
    return token;
  },
  verifyJWT: async (token) => {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const decoded = await jwtVerify(token["value"], secret);
    return decoded["payload"];
  },
};
