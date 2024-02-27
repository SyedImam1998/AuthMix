const express = require("express");

const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

router.get("/allData", (req, res, next) => {
  const myCookie = req.cookies.isLoggedIn;
  console.log("Value of myCookie:", myCookie);
  res.json("Okay Okay");
});

module.exports = router;
