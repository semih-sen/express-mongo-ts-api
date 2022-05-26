import mongoose from "mongoose";

const connectDatabase = (): void => {
  mongoose
    .connect(process.env.MONGO_URI as string, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDb connection successful");
    })
    .catch((err) => {
      console.error(err);
    });
};

export default connectDatabase;
