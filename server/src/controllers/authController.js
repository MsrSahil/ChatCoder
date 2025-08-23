import User from "../models/userModel.js";
import OTP from "../models/otpModel.js";
import bcrypt from "bcrypt";
import sendEmail from "../utils/sendEmail.js";
import { genAuthToken } from "../utils/auth.js";

export const Register = async (req, res, next) => {
  try {
    const { fullName, email, password, otp } = req.body;

    const fetchOtp = await OTP.findOne({ email });
    if (!fetchOtp) {
      const error = new Error("OTP expired or not found. Please try again.");
      error.statusCode = 404;
      return next(error);
    }

    // Expiry check
    // if (fetchOtp.expiresAt < Date.now()) {
    //   await OTP.deleteMany({ email });
    //   const error = new Error("OTP expired. Request a new one.");
    //   error.statusCode = 400;
    //   return next(error);
    // }

    const isOtpValid = await bcrypt.compare(otp, fetchOtp.otp);
    if (!isOtpValid) {
      const error = new Error("Invalid OTP");
      error.statusCode = 409;
      return next(error);
    }

    await OTP.deleteMany({ email });

    const hashedPassword = await bcrypt.hash(password, 10);
    const photo = `https://ui-avatars.com/api/?name=${fullName.charAt(
      0
    )}&background=random&color=fff&size=360`;

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      type: "normalUser",
      photo,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password, otp } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    const isPassVerified = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPassVerified) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      return next(error);
    }

    if (existingUser.TwoFactorAuth.toString() === "true") {
      const fetchOtp = await OTP.findOne({ email: existingUser.email });

      if (!fetchOtp) {
        const error = new Error("OTP not found. Please request a new one.");
        error.statusCode = 400;
        return next(error);
      }

      // Expiry check
      // if (fetchOtp.expiresAt < Date.now()) {
      //   await OTP.deleteMany({ email: existingUser.email });
      //   const error = new Error("OTP expired. Please request again.");
      //   error.statusCode = 400;
      //   return next(error);
      // }

      const isOtpValid = await bcrypt.compare(otp, fetchOtp.otp);
      if (!isOtpValid) {
        const error = new Error("Invalid OTP. Try again.");
        error.statusCode = 409;
        return next(error);
      }

      await OTP.deleteMany({ email: existingUser.email });
    }

    const token = genAuthToken(existingUser);

    return res
      .status(200)
      .cookie("IDCard", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json({
        message: `Welcome back ${existingUser.fullName}`,
        data: existingUser,
      });
  } catch (error) {
    next(error);
  }
};

export const GoogleLogin = async (req, res, next) => {};

export const SendOTPForRegister = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      const error = new Error("Please fill all the fields");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      return next(error);
    }

    await OTP.deleteMany({ email });

    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);

    await OTP.create({
      email,
      otp: hashedOtp,
    });

    const subject = "Verify your email";
    const message = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
                <div style="text-align: center; padding: 20px 0;">
                    <h2 style="color: #333;">MSR ChatApp.in</h2>
                    <h1 style="color: #333; margin-bottom: 20px;">Email Verification Code</h1>
                    <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <p style="font-size: 16px; color: #666; margin-bottom: 20px;">
                            Your verification code is:
                        </p>
                        <h2 style="font-size: 32px; color: #4CAF50; letter-spacing: 5px; margin: 20px 0;">
                            ${otp}
                        </h2>
                        <p style="font-size: 14px; color: #999; margin-top: 20px;">
                            This code will expire in 10 minutes. Please do not share this code with anyone.
                        </p>
                    </div>
                    <p style="font-size: 14px; color: #666; margin-top: 20px;">
                        If you didn't request this code, please ignore this email.
                    </p>
                </div>
            </div>
        `;

    await sendEmail(email, subject, message);

    return res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const SendOTPForLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("Please fill all the fields");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("User doesn't exists");
      error.statusCode = 409;
      return next(error);
    }
    if (existingUser.TwoFactorAuth.toString() === "false") {
      return res.status(200).json({
        message: "continue to login",
      });
    }

    await OTP.deleteMany({ email });

    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);
    await OTP.create({
      email,
      otp: hashedOtp,
    });

    const subject = "Verify your email";

    const message = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
                <div style="text-align: center; padding: 20px 0;">
                    <h2 style="color: #333;">MSR ChatApp.in</h2>
                    <h1 style="color: #333; margin-bottom: 20px;">Email Verification Code</h1>
                    <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <p style="font-size: 16px; color: #666; margin-bottom: 20px;">
                            Your verification code is:
                        </p>
                        <h2 style="font-size: 32px; color: #4CAF50; letter-spacing: 5px; margin: 20px 0;">
                            ${otp}
                        </h2>
                        <p style="font-size: 14px; color: #999; margin-top: 20px;">
                            This code will expire in 10 minutes. Please do not share this code with anyone.
                        </p>
                    </div>
                    <p style="font-size: 14px; color: #666; margin-top: 20px;">
                        If you didn't request this code, please ignore this email.
                    </p>
                </div>
            </div>
        `;

    await sendEmail(email, subject, message);
    res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    next(error);
  }
};
