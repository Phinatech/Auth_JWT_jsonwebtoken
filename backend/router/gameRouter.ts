import { Router } from "express";
import { createGameUser, getALL } from "../controller/game.Controller";
import { authheaders } from "../auth";

const gamerouter = Router();

gamerouter.route("/creategame").post(createGameUser);
gamerouter.route("/getgame").get(authheaders, getALL);

export default gamerouter;
