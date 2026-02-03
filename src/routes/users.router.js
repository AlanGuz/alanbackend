import { Router } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user.model.js";
import { CartModel } from "../models/cart.model.js";

const router = Router();

// Crear usuario 
router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    const exists = await UserModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ status: "error", message: "El email ya existe" });
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const cart = await CartModel.create({ products: [] });

    const newUser = await UserModel.create({
      first_name,
      last_name,
      email,
      age,
      password: hashPassword,
      cart: cart._id
    });

    res.status(201).json({ status: "success", payload: newUser });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

// Obtener todos
router.get("/", async (req, res) => {
  const users = await UserModel.find().populate("cart");
  res.json({ status: "success", payload: users });
});

// Obtener uno
router.get("/:uid", async (req, res) => {
  const user = await UserModel.findById(req.params.uid).populate("cart");
  res.json({ status: "success", payload: user });
});

// Actualizar
router.put("/:uid", async (req, res) => {
  const updatedUser = await UserModel.findByIdAndUpdate(req.params.uid, req.body, { new: true });
  res.json({ status: "success", payload: updatedUser });
});

// Eliminar
router.delete("/:uid", async (req, res) => {
  await UserModel.findByIdAndDelete(req.params.uid);
  res.json({ status: "success", message: "Usuario eliminado" });
});

export default router;
