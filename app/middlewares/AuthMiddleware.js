import { tokenDecode } from "../utility/TokenUtils.js";

export default (req, res, next) => {
  let token = req.headers.token;
  let decode = tokenDecode(token);

  if (!decode) {
    return res.status(401).json({
      status: "Faild",
      message: "unauthorized",
    });
  } else {
    req.headers.email = decode.email;
    req.headers.user_id = decode.user_id;
    next();
  }
};
