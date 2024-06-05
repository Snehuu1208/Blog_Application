const express = require("express");
const { authentication } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
router.get("/page", authMiddleware, (req, res) => {
  res.send("Welcome to home page");
});

router.post("/signup", authentication.signup);
router.post("/login", authentication.login);

module.exports = router;
