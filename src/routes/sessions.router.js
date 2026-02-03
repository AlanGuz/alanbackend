import { Router } from "express";
import passport from "passport";
import { generateToken } from "../utils/jwt.js";

const router = Router();

// Login
router.post("/login", passport.authenticate("login", { session: false }), (req, res) => {
  const token = generateToken(req.user);
  res.cookie("token", token, { httpOnly: true });
  res.json({ status: "success", message: "Login exitoso" });
});

// Ruta protegida
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({ status: "success", payload: req.user });
});

export default router;
