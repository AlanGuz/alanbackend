import { Router } from "express";
import passport from "passport";
import { authorizeRole } from "../middlewares/auth.middleware.js";
import { purchaseCart } from "../controllers/carts.controller.js";
import CartModel from "../models/cart.model.js";

const router = Router();


// ✅ Ruta prueba
router.get("/", (req, res) => {
    res.send("🛒 Este es tu carrito StreetShop");
});


// ✅ AGREGAR PRODUCTO AL CARRITO
router.post(
    "/:cid/products/:pid",
    passport.authenticate("jwt", { session: false }),
    authorizeRole("user"),
    async (req, res) => {

        const { cid, pid } = req.params;

        const cart = await CartModel.findById(cid);

        if (!cart) {
            return res.status(404).json({
                error: "Carrito no encontrado"
            });
        }

        const productIndex = cart.products.findIndex(
            p => p.product.toString() === pid
        );

        if (productIndex !== -1) {
            cart.products[productIndex].quantity++;
        } else {
            cart.products.push({
                product: pid,
                quantity: 1
            });
        }

        await cart.save();

        res.json({
            status: "success",
            message: "Producto agregado al carrito"
        });
    }
);


// ✅ COMPRA
router.post(
    "/:cid/purchase",
    passport.authenticate("jwt", { session: false }),
    authorizeRole("user"),
    purchaseCart
);

export default router;