import userModel from "../models/userModel.js";
import HandleError from "../helper/handleError.js";
import ApiHelper from "../helper/apiHelper.js";
import { sendToken } from "../helper/jwttoken.js";
import {sendEmail} from "../helper/sendEmail.js";

// user registration route controller with  hashing password and JWT token generation 
export const registerUser = async (req, res, next) => {
    try {

        if (!req.body || Object.keys(req.body).length === 0) {
            return next(
                new ApiHelper("Please provide all required fields", 400)
            );
        }
        const { name, email, password } = req.body;

        const user = await userModel.create({ name, email, password });

        // const token = user.getJWTToken();
        // res.status(201).json({ success: true, message: "User created successfully", user, token });

        sendToken(user, 201, res); // Use the sendToken function to send the token along with user in the response
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// User login route controller with JWT token generation
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return next(new ApiHelper("Invalid email or password", 401));
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return next(new HandleError("Invalid email or password", 401));
        }

        // const token = user.getJWTToken();
        // res.status(200).json({ success: true, message: "User logged in successfully", user, token });
        sendToken(user, 200, res); // Use the sendToken function to send the token  alogn with user in the response

    } catch (error) {
        console.log(error);
        next(error);
    }
};

// User logout route controller
export const logoutUser = async (req, res, next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        res.status(200).json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        // console.log(error);
        next(error);
    }
};


// reset password store DB 
export const resetPassword = async (
    req,
    res,
    next
) => {

    const { email } = req.body;

    const user = await userModel.findOne({
        email
    });

    if (!user) {
        return next(
            new HandleError(
                "Invalid email",
                400
            )
        );
    }

    try {

        const resetToken =
            user.getResetPasswordToken();

        await user.save({
            validateBeforeSave: false
        });

        const resetPasswordURL =
            `${req.protocol}://${req.get("host")}/reset/${resetToken}`;

        const message =
            `Your password reset token is given below:

${resetPasswordURL}

This link will expire in 30 minutes.

If you have not requested this password reset, please ignore this email and no changes will be made to your account.`;

        await sendEmail({
            email: user.email,
            subject: "Password Recovery",
            message
        });

        return res.status(200).json({
            success: true,
            message: "Email sent successfully"
        });

    } catch(error){

   user.resetPasswordExpire = undefined;
   user.resetPasswordToken = undefined;

   await user.save({
      validateBeforeSave: false
   });

   return next(
      new HandleError(
         "Could not send email",
         500
      )
   );
}

};
