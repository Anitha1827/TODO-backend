import mongoose from "mongoose";
import dotenv from "dotenv";

// config dotenv
dotenv.config();

export function dbConnection() {
  let mongo_url = process.env.mongo_url;
  try {
    mongoose.connect(mongo_url);
    console.log("Database connected succesfully!");
  } catch (error) {
    console.log(error.message);
  }
}
