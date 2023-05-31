import "dotenv/config";
import env from "./util/validateEnv.js"
import mongoose from "mongoose";
import app from "./app.js";


mongoose
  .connect(env.MONGO_URL)
  .then(() => {
    console.log("Mongo connected");
    app.listen(env.PORT, () => {
      console.log(`Server started on port ${env.PORT}`);
    });
  })
  .catch(console.error);
