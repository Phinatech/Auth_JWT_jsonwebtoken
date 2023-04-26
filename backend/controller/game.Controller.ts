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

export const createGameUser = async (req: Request, res: Response) => {};
