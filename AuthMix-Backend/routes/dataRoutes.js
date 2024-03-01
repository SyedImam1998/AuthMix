const express = require("express");

const cookieParser = require("cookie-parser");
const { updateDataUsingJwtToken } = require("../controller/dataController");
const { checkValidJwtAccessToken } = require("../middleware/jwtAuth.middleware");

const router = express.Router();
router.use(cookieParser());

router.get("/allData", (req, res, next) => {

  console.log('req.session.isLoggedIn', req.session.isLoggedIn);
  // console.log("Value of myCookie:", myCookie);
  res.json("Okay Okay");
});


router.post('/updateDataUsingJWT',checkValidJwtAccessToken,updateDataUsingJwtToken)

module.exports = router;
