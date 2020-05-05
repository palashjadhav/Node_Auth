const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add name']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email address is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    mobile: {
        type: Number,
        min: 99999999,
        max: 10000000000,
        default: 9826364679
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        min: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
UserSchema.methods.getJWT = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
};
UserSchema.methods.matchPassword = async function (enterdPassword) {
    return await bcrypt.compare(enterdPassword, this.password);
};
UserSchema.methods.getResetPasswordToken = function () {
    //generate token
    const resetToken = crypto.randomBytes(20).toString('hex');
    //hash token and save to resetPasswordToken 
    this.resetPasswordToken = crypto.createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    return resetToken;
}
module.exports = mongoose.model('User', UserSchema);