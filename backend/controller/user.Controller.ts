import { Request, Response } from "express";
import userModel from "../model/user.Model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { verifyUser } from "../utils/Email";

//Registering a user
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirmPassword, userName } = req.body;

    const token = crypto.randomBytes(64).toString("hex");
    const OTP = crypto.randomBytes(2).toString("hex");

    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(password, salt);

    const registing = await userModel.create({
      name,
      userName,
      email,
      password: hashed,
      confirmPassword: hashed,
      verified: false,
      token,
      OTP,
    });

    verifyUser(registing);
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
  } catch (error: any) {
    return res.status(404).json({
      message: `An error occured in getting all  user ${error}`,
      data: error.message,
    });
  }
};

//Getting one user
export const getSingleuser = async (req: Request, res: Response) => {
  try {
    const getsingle = await userModel.findById(req.params.userid);
    return res.status(200).json({
      message: `Welcome this user data has been gotten from the database`,
      data: getsingle,
    });
  } catch (error) {
    return res.status(404).json({
      message: `An error occured in getting a user ${error}`,
    });
  }
};

//Logining in a user in a our Application but they need to be verified before they can log in.
export const loginuser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const logusermethod = await userModel.findOne({ email });

    const checking = await bcrypt.compare(password, logusermethod?.password!);

    if (logusermethod) {
      if (checking) {
        if (logusermethod?.verified && logusermethod.token === "") {
          //thi is for the accesstoken that exprires every 20s
          const accesstoken = jwt.sign(
            {
              id: logusermethod?._id,
            },
            "acessTokenSecret",
            { expiresIn: "20s" }
          );
          return res.status(200).json({
            message: `Succesfully`,
            data: accesstoken,
          });
        } else {
          return res.status(400).json({
            message: "something went wrong",
          });
        }
      }
    }
    return res.status(200).json({
      message: "Succesffuly gotten all data",
      data: logusermethod,
    });
  } catch (error) {
    return res.status(404).json({
      message: `An error occured in getting a user ${error}`,
    });
  }
};

//verify a user
export const verifinguser = async (req: Request, res: Response) => {
  try {
    const verification = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        verified: true,
        token: "",
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Successfully updated data",
      data: verification,
    });
  } catch (error) {
    return res.status(400).json({
      message: "An error occurred while updating",
    });
  }
};

//Updating a user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userName } = req.body;
    const updating = await userModel.findByIdAndUpdate(
      req.params.userID,
      { userName },
      { new: true }
    );

    if (!updating) {
      return res.status(404).json({
        message: "This user does not exsit",
      });
    }

    return res.status(201).json({
      message: "Sucessfully updated the user name",
      data: updating,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error occured while updating the users",
    });
  }
};

export const Deleteuser = async (req: Request, res: Response) => {
  try {
    const deleteuser = await userModel.findByIdAndDelete(req.params.ID);

    if (!deleteuser) {
      return res.status(404).json({
        message: "This operation is not allowed",
      });
    }

    return res.status(200).json({
      message: "This user has been deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      message: "An error occurred while deleting",
    });
  }
};
