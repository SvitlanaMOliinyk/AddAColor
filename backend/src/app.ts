import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRouts from "./routes/user.js";
import paletteRouts from "./routes/palette.js";
import session from "express-session";
import env from "./util/validateEnv.js";
import MongoStore from "connect-mongo";

const app = express();

app.use(bodyParser.json({ limit: "25mb" }));
app.use(bodyParser.urlencoded({ limit: "25mb", extended: true }));
app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_URL,
    }),
  })
);

app.use("/api/user", userRouts);
app.use("/api/palette", paletteRouts);

app.use((req, res, next) => {
  next(Error("Endpoint not found"));
});

export default app;
