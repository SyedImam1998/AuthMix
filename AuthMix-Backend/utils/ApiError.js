class ApiError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
  returnJsonString() {
    return JSON.stringify({
      statusCode: this.statusCode,
      message: this.message,
    });
  }
}

exports.ApiError = ApiError;

/*
The error you're encountering is likely due to how the `ApiError` class is constructed. When you call `next(new ApiError(400, "Imam Error").returnJsonString());`, it's returning a string because you're calling `returnJsonString()`, which returns a JSON string.

However, in your error handling middleware, you're treating it as if it's an Error object, but it's actually just a string. Express expects an Error object to be passed to `next()` to trigger error handling middleware.

To resolve this issue, you should directly pass the `ApiError` instance to `next()`, rather than calling `returnJsonString()`:

```javascript
next(new ApiError(400, "Imam Error"));
```

Then, in your error handling middleware, you can access the `statusCode` and `message` properties directly from the `ApiError` instance.

Here's the corrected code:

```javascript
router.get("/allData2", (req, res, next) => {
  next(new ApiError(400, "Imam Error"));
});

router.use((err, req, res, next) => {
  console.error("err", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.log("statusCode", statusCode);
  console.log("message", message);

  res.status(statusCode).json({ error: message });
});
```

This way, `err` will be an instance of `ApiError`, allowing you to directly access its properties without needing to stringify and parse it.
*/
