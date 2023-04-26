import express, { Application } from "express";
import { Mainapp } from "./mainapp";
import { Dbconfig } from "./config/db";

const Port = 1234;

const app: Application = express();
Mainapp(app);
Dbconfig();

app.listen(Port, () => {
  console.log("server is Listening on :", Port);
});
