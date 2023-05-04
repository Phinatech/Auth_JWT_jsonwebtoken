import express, { Application } from "express";
import { Mainapp } from "./mainapp";
import { Dbconfig } from "./config/db";

const Port = 1234;

const app: Application = express();
Mainapp(app);
Dbconfig();

const server = app.listen(Port, () => {
  console.log("server is Listening on :", Port);
});

process.on("uncaughtException", (err: Error) => {
  console.log("shutting down serve");
  console.log(err);
  process;
});

process.on("unhandledRejection", (reason: any) => {
  console.log("shutting down server unhandledRejection");
  console.log(reason);
  server.close(() => {
    process.exit(1);
  });
});
