const User = require('../models/User');
exports.register = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
}
exports.login = async (req, res, next) => {
    try {
        const { password, email } = req.body;
        if (!password || !email) {
            res.status(400).json({ err: "Please send the credential" });
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            res.status(400).json({ err: "Please send the vaild credential" });
        }
        const vaildPassword = user.matchPassword(password);
        if (!vaildPassword) {
            res.status(400).json({ err: "Please send the vaild credential" });
        }
        sendTokenResponse(user, 200, res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
//Sending jwt in cookie
const sendTokenResponse = (user, statuscode, res) => {
    //Create token
    const token = user.getJWT();
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    if (process.env.NODE_ENV === "production") {
        options.secure = true;
    }
    res
        .status(statuscode)
        .cookie('token', token, options)
        .json({ success: true })

}
exports.me = async (req, res, next) => {
    res.send(req.user);
}