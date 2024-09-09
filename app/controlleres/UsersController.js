import Users from "../model/UserModel.js";
import sendEmail from "../utility/EmailUtilis.js";
import { tokenEncode } from "../utility/TokenUtils.js";

//register
export const register = async (req, res) => {
  try {
    const reqBody = req.body;
    const user = await Users.create(reqBody);

    if (user) {
      return res.status(200).json({
        message: `Hi ${user.firstName}, your registration successfully done`,
        user,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

//login
export const login = async (req, res) => {
  try {
    const reqBody = req.body;
    const user = await Users.findOne(reqBody);

    if (!user) {
      return res.status(404).json({
        message: `user not found`,
      });
    } else {
      let token = await tokenEncode(user.email, user._id);
      return res.status(200).json({
        message: "user login success",
        user: { token: token, user },
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

//profile
export const profileDetails = async (req, res) => {
  try {
    let user_id = req.headers.user_id;
    let email = req.headers.email;

    // const users = await Users.findOne({ _id: user_id });
    const users = await Users.findOne({ email });

    return res.status(200).json({
      message: "user profile success",
      users,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

//update user with params
export const profileUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const reqBody = req.body;

    const user = await Users.findByIdAndUpdate(id, reqBody, { new: true });

    return res.status(200).json({
      message: "profile update success",
      user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

//profile update with headers
export const profileUpdateWithHeders = async (req, res) => {
  try {
    const user_id = req.headers.user_id;
    const reqBody = req.body;

    const user = await Users.updateOne({ _id: user_id }, reqBody);

    return res.status(200).json({
      message: "profile update success",
      user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

//email Verify
export const emailVerify = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "user not found",
      });
    } else {
      let code = Math.floor(100000 + Math.random() * 900000);
      let to = user.email;
      let sub = `Hi ${user.firstName}, your verification code is here`;
      let msg = `code is ${code}`;

      await sendEmail(to, sub, msg);

      //update otp code
      await Users.updateOne({ email }, { otp: code });
      return res.status(200).json({
        message: "your verification succussfully done",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

//reset password
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    const userEmail = await Users.findOne({ email });
    const userOtp = await Users.findOne({ otp });

    if (!userEmail) {
      return res.status(401).json({
        message: "user not found",
      });
    }
    if (!userOtp) {
      return res.status(401).json({
        message: `Hey ${
          userEmail.firstName + " " + userEmail.lastName
        }, your otp code is not match`,
      });
    }

    //password update
    await Users.updateOne({ email }, { password, otp: 0 });
    return res.status(200).json({
      message: "successfully password update done",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

//code Verify
export const codeVerify = async (req, res) => {
  res.json({ status: "success" });
};
