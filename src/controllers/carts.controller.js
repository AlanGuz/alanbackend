
import TicketService from "../services/ticket.service.js";
import ProductModel from "../models/product.model.js";
import CartModel from "../models/cart.model.js";
import { v4 as uuidv4 } from "uuid";

const ticketService = new TicketService();

export const purchaseCart = async (req, res) => {

    const { cid } = req.params;

    const cart = await CartModel
        .findById(cid)
        .populate("products.product");

    if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" });
    }

    let total = 0;
    let noStock = [];

    for (const item of cart.products) {

        const product = item.product;

        if (product.stock >= item.quantity) {
            product.stock -= item.quantity;
            total += product.price * item.quantity;
            await product.save();
        } else {
            noStock.push(product._id);
        }
    }

    const ticket = await ticketService.createTicket({
        code: uuidv4(),
        amount: total,
        purchaser: req.user.email
    });

    res.json({
        ticket,
        productsWithoutStock: noStock
    });
};