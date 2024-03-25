import { Request, Response } from "express";
import UserModel from "../models/userModel";

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { loginData } = req.body;

    const user = await UserModel.findOne({
      f_Email: loginData.email 
    });

    const userDetails = await UserModel.findOne({ f_Email: loginData.email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Not Exist",
      });
    } else{
      if (user.f_Pwd === loginData.password) {
        res.status(200).json({
          success: true,
          message: "Login Successful",
          data: userDetails
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid Password",
        });
      }
    }
  } catch (error) {
    console.log("userLogin error", error);
    res.status(400).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const userSignUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({
      f_Email: email,
    });

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    } else {
      const newUser = new UserModel({
        f_UserName: name,
        f_Email: email,
        f_Pwd: password,
      });

      const savedUser = await newUser.save();

      const userDetails = await UserModel.findOne({ f_Email: email });

      res.status(200).json({
        success: true,
        data: userDetails,
        message: "User Added Successfully",
      });
    }
  } catch (error) {
    console.log("userSignUp error", error);
    res.status(400).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
