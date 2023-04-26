import mongoose from "mongoose";

interface Iuser {
  email: string;
  password: string;
  confirmPassword: string;
  token: string;
  verified: boolean;
}

interface Usermodel extends Iuser, mongoose.Document {}

const userSchema = new mongoose.Schema<Iuser>(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model<Usermodel>("user", userSchema);
