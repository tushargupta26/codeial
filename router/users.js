const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/users_controller');
router.get('/profile',usercontroller.profile);
router.get('/sign-in',usercontroller.SignIn);
router.get('/sign-up',usercontroller.SignUp);
router.post('/create',usercontroller.create);
module.exports = router;