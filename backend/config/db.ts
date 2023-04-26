import mongoose from "mongoose";

const LocalURL = "mongodb://127.0.0.1:27017/AuthJWT";

export const Dbconfig = async () => {
  try {
    const db = await mongoose.connect(LocalURL);
    if (mongoose.connection.host === "127.0.0.1") {
      console.log(`You are connected to ${mongoose.connection.host}`);
    } else {
      console.log("you are connected to Cloud Host");
    }
  } catch (error) {
    console.log("An error occurred while connecting to database", error);
  }
};
