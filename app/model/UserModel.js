import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Users = mongoose.model("users", userSchema);

//export
export default Users;