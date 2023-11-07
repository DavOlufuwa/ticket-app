import mongoose from "mongoose";

const connect = async () => {
  // try catch
  try{
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to Mongo DB");
  }
  catch(error){
    throw new Error("Error in connecting to Mongo DB");
  }
}

export default connect