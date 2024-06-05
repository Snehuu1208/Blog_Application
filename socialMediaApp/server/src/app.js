const authRouter = require("./routes/authRoutes");
const blogRouter = require("./routes/blogRoutes");
const cors = require("cors");
const express = require("express");

const app = express();

const server = () => {
  app.use(express.json());
  app.use(cors());
  app.use("/user", authRouter);
  app.use("/blog", blogRouter);
  return app;
}

module.exports = server;
