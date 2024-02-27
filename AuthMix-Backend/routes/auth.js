const express = require("express");

const { loginController, signUpController, isLoggedIn } = require("../controller/adminController.js");
const bodyParser = require("body-parser");


const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));

router.post("/login", loginController);

router.post("/signup", signUpController);

router.get("/isLoggedIn", isLoggedIn);

module.exports = router;
