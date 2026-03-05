const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model.js");

async function authUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Authentication token missing"
        });
    }

    try {

        const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token });

        if (isTokenBlacklisted) {
            res.clearCookie("token");
            return res.status(401).json({
                message: "Token is invalid. Please login again."
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports = { authUser };