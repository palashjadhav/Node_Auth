const express = require('express');
const { register, login, me, forgotPassword, resetPassword } = require('../controllers/auth');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').post(protect, me);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:resettoken').post(resetPassword);

module.exports = router;