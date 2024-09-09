import { JWT_EXPIRE_TIME, JWT_KEY } from "../config/config.js";
import JWT from "jsonwebtoken";

//encode token
export const tokenEncode = async (email, user_id) => {
  const payload = { email: email, user_id: user_id };
  const key = JWT_KEY;
  const expire = { expiresIn: JWT_EXPIRE_TIME };
  return JWT.sign(payload, key, expire);
};

//decode token
export const tokenDecode = (token) => {
  try {
    return JWT.verify(token, JWT_KEY);
  } catch (error) {
    return null;
  }
};
