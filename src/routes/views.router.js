import { Router } from "express";
import ProductModel from "../models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
    const products = await ProductModel.find().lean();
    res.render("home", { products });
});

export default router;