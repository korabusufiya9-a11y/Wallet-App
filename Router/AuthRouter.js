const express=require('express');
const router=express.Router();
const AuthController=require('../Controllers/AuthController');

router.post('/register', AuthController.register);
router.post('/verifyotp',AuthController.verifyotp);
router.post('/login',AuthController.login);
router.post('/resendOtp',AuthController.resendOtp);

module.exports=router;