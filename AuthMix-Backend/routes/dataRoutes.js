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

  throw new ApiError(400,"Imam Error"); /// this also works if you are throing error on sync code
  // next(new ApiError(400,"Imam Error")); this for async code
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

/*
In Express.js, the `throw` statement can be used to generate synchronous errors within your routes or middleware. When an error is thrown, Express.js automatically passes it to the error-handling middleware. However, you should be cautious about using `throw` for asynchronous code because it won't work as expected.

For asynchronous operations, like database queries or HTTP requests, you should use `next`, the third parameter provided in Express.js middleware functions, to pass errors to Express's error-handling middleware. This ensures that errors occurring during asynchronous operations are properly handled.

Here's a brief example to illustrate:

```javascript
// Synchronous code using throw
app.get('/sync', (req, res, next) => {
    throw new Error('Synchronous error occurred');
});

In the case of synchronous code within Express.js route handlers or middleware, if an error is thrown using throw, it will be caught by the surrounding try-catch block if it exists.

So, if you have synchronous code with a throw statement inside a try block in Express.js, and that throw statement triggers an error, it will indeed be caught by the corresponding catch block.




// Asynchronous code using next
app.get('/async', (req, res, next) => {
    // Simulating asynchronous operation
    setTimeout(() => {
        // Simulating an error
        const error = new Error('Asynchronous error occurred');
        next(error); // Pass error to Express error-handling middleware
    }, 1000);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
```

In this example:

- The `/sync` route uses `throw` to generate a synchronous error.
- The `/async` route uses `next` to pass an asynchronous error to Express's error-handling middleware.
- The error-handling middleware catches any errors that occur in the application and sends an appropriate response.

Remember that it's important to handle both synchronous and asynchronous errors properly in your Express.js application to ensure robustness and reliability.

*/