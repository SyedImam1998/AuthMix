const express = require("express");
const {
  jwtLoginController,
  jwtSignupController,
  jwtLogoutController,
} = require("../controller/jwtAdminController");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const {
  jwtAuthMiddleware,
  checkValidJwtAccessToken,
} = require("../middleware/jwtAuth.middleware");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());

// router.use(jwtAuthMiddleware(req,res,next))

router.post("/jwtLogin", jwtLoginController);

router.post("/jwtSignUp", jwtSignupController);

router.post("/jwtLogout", jwtAuthMiddleware, jwtLogoutController);

router.post(
  "/checkValidJwtToken",
  checkValidJwtAccessToken,
  (req, res, next) => {
    res.json("OK");
  }
);

router.post("/createNewAccessToken");

module.exports = router;
