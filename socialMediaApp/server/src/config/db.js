const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Social-media-application");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = dbConnection;
