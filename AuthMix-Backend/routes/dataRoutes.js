const express = require("express");

const cookieParser = require("cookie-parser");
const { updateDataUsingJwtToken } = require("../controller/dataController");
const {
  checkValidJwtAccessToken,
} = require("../middleware/jwtAuth.middleware");
const { ApiError } = require("../utils/ApiError");

const router = express.Router();
router.use(cookieParser());

router.get("/allData", (req, res, next) => {
  console.log("req.session.isLoggedIn", req.session.isLoggedIn);
  // console.log("Value of myCookie:", myCookie);
  res.json("Okay Okay");
});

router.get("/allData2", (req, res, next) => {

  next(new ApiError(400,"Imam Error"));
});

router.post(
  "/updateDataUsingJWT",
  checkValidJwtAccessToken,
  updateDataUsingJwtToken
);

router.use((err, req, res, next) => {
  console.log("err", err);
  const errorObj=err;
  const statusCode = errorObj.statusCode || 500;
  console.log('statusCode', statusCode)
  console.log('err.msg', errorObj.message)
  res.status(statusCode).json({ error: errorObj.message });
});

module.exports = router;
