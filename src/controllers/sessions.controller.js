import UserService from "../services/user.service.js";
import UserDTO from "../dto/user.dto.js";
import { generateResetToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendResetEmail } from "../utils/mailer.js";

const userService = new UserService();

export const getCurrentUser = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "No autenticado" });
    }
    const safeUser = new UserDTO(req.user);
    res.json({
        status: "success",
        payload: safeUser
    });
};

export const requestPasswordReset = async (req, res) => {

    const { email } = req.body;
    const user = await userService.getUserByEmail(email);
    if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const token = generateResetToken(user);
    const link = `http://localhost:8080/api/sessions/reset-password/${token}`;
await sendResetEmail(user.email, link);
res.json({
    message: "Email de recuperación enviado"
});
};


export const resetPassword = async (req, res) => {

    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userService.getUserById(decoded.id);

        const isSamePassword = await bcrypt.compare(newPassword, user.password);

        if (isSamePassword) {
            return res.status(400).json({
                error: "No podés usar la misma contraseña"
            });
        }

        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        await userService.changePassword(user._id, hashedPassword);

        res.json({ message: "Contraseña actualizada" });

    } catch (error) {
        res.status(400).json({ error: "Token inválido o expirado" });
    }
};