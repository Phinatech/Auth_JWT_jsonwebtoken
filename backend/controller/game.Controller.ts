import express, { Request, Response } from "express";

import gameModel from "../model/game.Model";

export const getALL = async (req: Request, res: Response) => {
  try {
    const getGameUser = await gameModel.find();
    return res.status(200).json({
      message: "All game user successfully gotten",
      data: getGameUser,
    });
  } catch (error) {
    console.log("An error in getting all Games");
  }
};

export const createGameUser = async (req: Request, res: Response) => {
  try {
    const { name, details } = req.body;
    const creategame = await gameModel.create({
      name,
      details,
    });

    return res.status(200).json({
      message: "Successfully created a user",
      data: creategame,
    });
  } catch (error) {
    console.log("An error in creating a Games");
  }
};
