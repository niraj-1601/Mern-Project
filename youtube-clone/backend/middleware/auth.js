import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (!authHeader) return res.status(401).json("Access Denied");

    const token = authHeader.split(" ")[1]; // Bearer <token>
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json("Token is not valid");
        req.user = user;
        next();
    });
};