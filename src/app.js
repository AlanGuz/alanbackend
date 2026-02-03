import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import "./config/passport.js";

import usersRouter from "./routes/users.router.js";
import sessionsRouter from "./routes/sessions.router.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/users", usersRouter);
app.use("/api/sessions", sessionsRouter);

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("🟢 Conectado a MongoDB"))
  .catch(err => console.error("🔴 Error Mongo:", err));

app.listen(8080, () => {
  console.log("🚀 Servidor corriendo en http://localhost:8080");
});
