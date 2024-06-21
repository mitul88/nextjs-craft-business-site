import { JWThelper } from "@/utils/JWTherlper";

const validate = async (token) => {
  if (!token) return false;
  const validateToken = await JWThelper.verifyJWT(token);
  if (!validateToken) return false;
  return true;
};

export async function authMiddleware(req) {
  const token = req.cookies.get("token");
  return { isValid: await validate(token) };
}
