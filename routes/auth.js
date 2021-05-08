const { Router } = require('express');
const authController = require('../controllers/authControllers');
const router = Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

router.post('/register', authController.signup);
router.post('/login', authController.login);
router.get('/user', auth, authController.get_user);
router.post('/forgotpassword', authController.forget_passwords)
router.post('/resetpassword', authController.reset_passwords)
router.put('/updatePasswordViaEmail', authController.update_password)


module.exports = router;