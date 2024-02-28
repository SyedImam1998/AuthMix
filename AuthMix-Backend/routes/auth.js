const express = require("express");

const { loginController, signUpController, isLoggedIn, logout } = require("../controller/adminController.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());

router.post("/login", loginController);

router.post("/signup", signUpController);

router.get("/isLoggedIn", isLoggedIn);

router.get('/logout',logout)

module.exports = router;
