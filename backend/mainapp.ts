import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

export const Mainapp = async (app: Application) => {
  app.use(cors()).use(morgan("dev")).use(express.json());

  app.get("", (req: Request, res: Response) => {
    return res.status(200).json({
      message: "Server is up and running",
    });
  });

  //Initializing the router

  app.all("*", (req: Request, res: Response) => {
    return res.status(404).json({
      message: `This routes ${req.body} is not found `,
    });
  });
};
