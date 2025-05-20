import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected MongoDB");
    
    // const collections = await mongoose.connection.db
    //   .listCollections()
    //   .toArray();
    // // console.log("Collections:");
    // collections.forEach((c) => console.log(c.name));
  } catch (err) {
    console.error("Error:", err.message);
  }
}

export default connectMongo;
