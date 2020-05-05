const jwt = require('jsonwebtoken');
const User = require('../models/User');
exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookie.token) {
        token = req.cookie.token;
    }
    if (!token) {
        return res.status(400).json({ error: "Not Authorize" });
    }
    try {
        //verify token
        const decode = jwt.decode(token, process.env.JWT_SECRET);
        req.user = await User.findById(decode.id);
        next();
    } catch (error) {
        return res.status(400).json({ error: "Not Authorize" });
    }
}