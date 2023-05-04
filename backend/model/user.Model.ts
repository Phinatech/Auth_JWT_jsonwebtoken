import mongoose from "mongoose";

interface Iuser {
  name: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  token: string;
  verified: boolean;
  OTP: string;
}

interface Usermodel extends Iuser, mongoose.Document {}

const userSchema = new mongoose.Schema<Iuser>(
  {
    name: {
      type: String,
    },
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    confirmPassword: {
      type: String,
    },
    token: {
      type: String,
    },
    verified: {
      type: Boolean,
    },
    OTP: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Usermodel>("user", userSchema);
