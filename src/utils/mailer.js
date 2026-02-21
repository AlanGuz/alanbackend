import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

export const sendResetEmail = async (to, link) => {
    await transporter.sendMail({
        from: `"SneakerShop" <${process.env.GMAIL_USER}>`,
        to,
        subject: "Recuperación de contraseña",
        html: `
            <h2>Recuperar contraseña</h2>
            <p>Hacé click en el botón:</p>
            <a href="${link}" style="
                background: black;
                color: white;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
            ">
                Resetear contraseña
            </a>
            <p>Este link expira en 1 hora</p>
        `
    });
};