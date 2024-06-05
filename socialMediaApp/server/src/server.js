const serverSetup = require("./app");
const dbConnection = require("./config/db");
require("dotenv").config();

serverSetup().listen(5000, async () => {
  await dbConnection();
  console.log("Server started on Port 5000");
});
