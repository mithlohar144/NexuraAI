import jwt from "jsonwebtoken";




export function authUser(req, res, next) {

    const authHeader = req.headers.authorization;
    const bearerToken =
        typeof authHeader === "string" && authHeader.toLowerCase().startsWith("bearer ")
            ? authHeader.slice(7).trim()
            : null;

    const token = req.cookies?.token || bearerToken;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized",
            success: false,
            err: "No token provided"
        })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized",
            success: false,
            err: "Invalid token"
        })
    }

}
