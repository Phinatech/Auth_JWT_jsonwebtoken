import { Request, Response } from "express";
import userModel from "../model/user.Model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

//Registering a user
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, confirmPassword } = req.body;

    const token = crypto.randomBytes(64).toString("hex");
    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(password, salt);

    const registing = await userModel.create({
      email,
      password: hashed,
      confirmPassword: hashed,
    });
    if (registing) {
      return res.status(200).json({
        message: "User successfully created",
        data: registing,
      });
    }

    //cross checking for the details of the user
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Missing (email, password, confirm password) in request",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: `An error occured in registering user ${error}`,
    });
  }
};

//Getting all user
export const getAlluser = async (req: Request, res: Response) => {
  try {
    const getall = await userModel.find();
    return res.status(200).json({
      message: `Gotten all ${getall.length} user`,
      data: getall,
    });
  } catch (error) {
    return res.status(404).json({
      message: `An error occured in getting all  user ${error}`,
    });
  }
};

//Getting one user
export const getSingleuser = async (req: Request, res: Response) => {
  try {
    const getsingle = await userModel.findById(req.params.userid);
    return res.status(200).json({
      message: `Welcome this user data has been gotten from the server`,
      data: getsingle,
    });
  } catch (error) {
    return res.status(404).json({
      message: `An error occured in getting a user ${error}`,
    });
  }
};

export const loginuser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const logusermethod = await userModel.findOne({ email });

    const checking = await bcrypt.compare(password, logusermethod?.password!);

    if (logusermethod) {
      if (checking) {
        if (logusermethod?.verified && logusermethod.token === "") {
          const accesstoken = jwt.sign(
            {
              id: logusermethod?._id,
            },
            "acessTokenSecret",
            {}
          );
          return res.status(200).json({
            message: `Succesfully`,
            data: logusermethod,
          });
        }
      }
    } else {
    }
  } catch (error) {
    return res.status(404).json({
      message: `An error occured in getting a user ${error}`,
    });
  }
};
