import { Router } from "express";

import {
  Deleteuser,
  getAlluser,
  loginuser,
  registerUser,
} from "../controller/user.Controller";
import { verifinguser } from "../controller/user.Controller";
import { getSingleuser } from "../controller/user.Controller";

const router = Router();

router.route("/CreateUser").post(registerUser);
router.route("/getUser").get(getAlluser);
router.route("/login").post(loginuser);
router.route("/delete/:ID").delete(Deleteuser);
router.route("/verify/:id").patch(verifinguser);
router.route("/getsingleuser/:userid").get(getSingleuser);

export default router;
