import dotenv from "dotenv";
dotenv.config();

import "./src/database";

import express from "express";
import cors from "cors";
import helmet from "helmet";

import homeRoutes from "./src/routes/homeRouter";
import userRoutes from "./src/routes/userRouter";
import studentRoutes from "./src/routes/studentRouter";
import photoRoutes from "./src/routes/photoRouter";
import tokenRoutes from "./src/routes/tokenRouter";

const app = express();

const whiteList = ["http://localhost:5173", "https://pt.wikipedia.org"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions)); //
app.use(helmet());
//Config response for forms and others
app.use(express.urlencoded({ extended: true }));
//Config response for jsons
app.use(express.json());
app.use(express.static("./uploads"));

app.use(homeRoutes);
app.use(userRoutes);
app.use(studentRoutes);
app.use(photoRoutes);
app.use(tokenRoutes);

app.listen(3000, () => {
  console.log("Server is up and running on port 3000");
});
