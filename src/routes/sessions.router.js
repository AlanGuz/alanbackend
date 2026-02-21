import { Router } from "express";
import passport from "passport";
import { generateToken } from "../utils/jwt.js";
import { requestPasswordReset, resetPassword } from "../controllers/sessions.controller.js";

const router = Router();

// Login
router.post("/login", passport.authenticate("login", { session: false }), (req, res) => {
  const token = generateToken(req.user);
  res.cookie("token", token, { httpOnly: true });
  res.json({ status: "success", message: "Login exitoso" });
});

// Ruta protegida
import { getCurrentUser } from "../controllers/sessions.controller.js";

router.get(
  "/current",
  passport.authenticate("jwt", { session:false }),
  getCurrentUser
);

export default router;

router.post("/forgot-password", requestPasswordReset);
router.post("/reset-password/:token", resetPassword);