import { Request, Response } from "express";
import userModel from "../model/user.Model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, confirmPassword } = req.body;
  } catch (error) {
    return res.status(404).json({
      message: "Error registering user",
    });
  }
};
