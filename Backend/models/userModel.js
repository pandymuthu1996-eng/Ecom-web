import mongoose from "mongoose";
import validator from "validator"; // this is the validator library that we will use to validate the email address form NPM
import bcrypt from "bcryptjs"; // this is the bcrypt library that we will use to hash the password form NPM
import jsonwebtoken from "jsonwebtoken"; // this is the jsonwebtoken library that we will use to generate the token form NPM
import crypto from "crypto";


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxlength: [40, "Name cannot exceed 40 characters"]
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true, //[true, "Email already exists"]
    validate: [validator.isEmail, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false // this means that when we query the user, the password field will not be returned by default 
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },

    role: {
      type: String,
      default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  
    

},{timestamps: true});   //using timestamps createdAt updateAt will be automatically added by mongoose

// pre-save middleware to hash the password before saving the user document
userSchema.pre("save", async function () {

  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);

});

// create a jwt token for the user
userSchema.methods.getJWTToken = function () {
  return jsonwebtoken.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
}; 

// compare the password with the hashed password in the database
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};  

//Generate random token for reset password function using the crypto
userSchema.methods.getResetPasswordToken = function () {

  const resetToken =
    crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken =
    crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

  this.resetPasswordExpire =
    Date.now() + 30 * 60 * 1000;

  return resetToken;
};

export default mongoose.model("User", userSchema);