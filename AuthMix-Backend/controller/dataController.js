exports.updateDataUsingJwtToken = (req, res, next) => {
    
  let value = 0;
  console.log("value", value);
  const { valueFromClient } = req.body;

  value = valueFromClient;
  console.log("value", value);

  res.json("OK");
};
