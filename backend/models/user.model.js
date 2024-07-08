import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    location: {
      type: String,
      default: "",
    },
    age: {
      type: Number,
      min: 0,
    },
    work: {
      type: String,
      default: "",
    },
    dob: {
      type: Date,
    },
    description: {
      type: String,
      default: "",
    },
    otp: {
        type: String
      },
      otpExpires: {
        type: Date
      }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
