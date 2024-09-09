import nodemailer from "nodemailer";
import {
  EMAIL_HOST,
  EMAIL_PASS,
  EMAIL_PORT,
  EMAIL_SECURITY,
  EMAIL_USER,
} from "../config/config.js";

const sendEmail = async (to, sub, msg) => {
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_SECURITY,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOption = {
    from: `Ostad Task Manager <${EMAIL_USER}>`,
    to: to,
    subject: sub,
    text: msg,
  };

  try {
    return await transporter.sendMail(mailOption);
  } catch (error) {
    console.log(error.message);
  }
};

//export
export default sendEmail;
