import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
    console.log("MongoDB Connected!!");
  } catch (error) {
    console.log("Failed to connect to MongoDB");
  }
};
