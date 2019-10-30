const express = require('express');
const router = express.Router();
const passport = require('passport');
const usercontroller = require('../controller/users_controller');
router.get('/profile/:id',passport.checkAuthentication,usercontroller.profile);
router.post('/update/:id',passport.checkAuthentication,usercontroller.update);
router.get('/sign-in',usercontroller.SignIn);
router.get('/sign-up',usercontroller.SignUp);
router.post('/create',usercontroller.create);
// use passport as a middleware
router.post('/create-session',  passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),usercontroller.createsession)

router.get('/sign-out',usercontroller.destroySession);
module.exports = router;