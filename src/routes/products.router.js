import { Router } from "express";
import passport from "passport";
import { authorizeRole } from "../middlewares/auth.middleware.js";
import ProductModel from "../models/product.model.js";

const router = Router();

// Ruta pública
router.get("/", async (req, res) => {

  const products = await ProductModel.find();

  res.json({
    status: "success",
    payload: products
  });

});

// Crear producto (SOLO ADMIN)
router.post(
  "/",
  passport.authenticate("jwt", { session:false }),
  authorizeRole("admin"),
  async (req, res) => {

    const product = await ProductModel.create(req.body);

    res.status(201).json({
      status: "success",
      payload: product
    });
  }
);
export default router;