import mongoose from "mongoose";

export const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    // Listning connected event
    connection.on("connected", () => {
      console.log("MongoDb connected successfully 🚀");
    });

    // Listning error event
    connection.on("error", (error) => {
      console.log(
        `MongoDb connection error, Please make sure MongoDb is running ${error}`
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong !! 😥😥");
    console.log(error);
  }
};
