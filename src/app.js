import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import "./config/passport.js";
import usersRouter from "./routes/users.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import handlebars from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// ===== CREAR APP =====
const app = express();

// ===== PATH CONFIG =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== HANDLEBARS =====
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// ===== MIDDLEWARES =====
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "../public")));

// ===== ROUTES =====
app.use("/", viewsRouter);
app.use("/api/users", usersRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// ===== DB =====
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("🟢 Conectado a MongoDB"))
  .catch(err => console.error("🔴 Error Mongo:", err));

// ===== SERVER =====
app.listen(8080, () => {
  console.log("👟 StreetShop API corriendo en http://localhost:8080");
});