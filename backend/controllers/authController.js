import { User } from "../models/user.model.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, "access-secret-key", {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, "refresh-secret-key", {
    expiresIn: "7d",
  });
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "workpalakgarg296@gmail.com",
    pass: "nxelmehleoqizqqo",
  },
});
const generateOTP = () => {
  return Math.floor(1000+Math.random()*9000);
};
const signupUser = async (req, res) => {
  try {
    let { email, username, password } = req.body;
    email = email.trim();
    username = username.trim();
    password = password.trim();
    if (email == "" || password == "" || username == "") {
      return res.status(400).json({ error: "All fields are requi587red" });
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email entered" });
    } else if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "password too short (minimum 8 characters)" });
    }

    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = generateOTP();
    const otpExpires = Date.now() + 3600000;

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      otp,
      otpExpires,
    });
    await newUser.save();

    const mailOptions = {
      from: "workpalakgarg296@gmail.com",
      to: email,
      subject: "Verify your account",
      text: `Your OTP is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: error });
      }
      res.status(201).json({
        message: "User registered successfully. Check your email for the OTP.",
        userId: newUser._id,
        email,
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in signupUser: ", err);
  }
};

const VerifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or OTP" });
    }

    // Check if the OTP is correct and not expired
    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    // OTP verified, clear the OTP fields
    user.otp = undefined;
    user.otpExpires = undefined;

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Store the refresh token in the database
    user.refreshToken = refreshToken;
    await user.save();

    // Send the access token as response
    res.status(200).json({
      message: "OTP verified successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    const otp = generateOTP();
    const otpExpires = Date.now() + 3600000; // 1 hour

    // Update the user's OTP and expiration
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    const mailOptions = {
      from: "workpalakgarg296@gmail.com",
      to: email,
      subject: "Verify your account",
      text: `Your OTP is: ${otp}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: error });
      }
      res.status(201).json({
        message: "otp sent. Check your email for the OTP.",
        userId: user._id,
        email,
      });
      
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Store the refresh token in the database
    user.refreshToken = refreshToken;
    await user.save();

    // Send the tokens as response
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export { loginUser, signupUser, VerifyOtp,resendOtp};
