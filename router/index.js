const express = require("express");

const router = express.Router();

const homecontroller = require('../controller/home_controller');

console.log("yo buddy whats up");

router.get('/',homecontroller.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
module.exports = router;