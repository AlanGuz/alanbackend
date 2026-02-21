export const authorizeRole = (role) => {
    return (req, res, next) => {

        // req.user viene del JWT (passport current)
        if (!req.user) {
            return res.status(401).json({ error: "No autenticado" });
        }

        if (req.user.role !== role) {
            return res.status(403).json({ error: "No autorizado" });
        }

        next();
    };
};