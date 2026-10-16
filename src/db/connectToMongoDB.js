import mongoose from "mongoose";
// import { Student } from "../models/student.js";

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");

    // await Student.syncIndexes();
    // console.log("Synced db indexes");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
