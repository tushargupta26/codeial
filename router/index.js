const express = require("express");

const router = express.Router();

const homecontroller = require('../controller/home_controller');

console.log("yo buddy whats up");

router.get('/',homecontroller.home);
module.exports = router;