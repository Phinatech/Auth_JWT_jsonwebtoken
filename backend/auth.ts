import { NextFunction, Request, Response } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";

export const authheaders = (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authoriation;
    if (token) {
      const realtoken = token.split(" ")[2];

      //checking for the given token
      if (realtoken) {
        jwt.verify(realtoken, "accessTokenSecret", (err: any, payload: any) => {
          if (err) {
            throw err;
          } else {
            req.user = payload;
            next();
          }
        });
      } else {
        res.status(404).json({
          message: "Something doesnot seems right1",
        });
      }
    } else {
      res.status(404).json({
        message: "You dont have access to this operation",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "An Error occured while accessing this operation",
    });
  }
};
