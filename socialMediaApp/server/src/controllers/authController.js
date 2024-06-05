const bcrypt = require("bcrypt");
const userSchema = require("../models/userSchema");
const jwt = require("jsonwebtoken");

class Authentication {
  async signup(req, res) {
    try {
      const { username, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hassedPassword = await bcrypt.hash(password, salt);

      const newUser = await userSchema.create({
        username: username,
        email: email,
        password: hassedPassword,
      });
      res.send({ user: newUser });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await userSchema.findOne({ email: email });

      if (!user) {
        res.send({ message: "User not found" });
      }
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        res.send({ message: "Invalid Password Try agin!" });
      }
      const token = jwt.sign({ user }, process.env.JWT_SECURITY_KEY);
      if (!token) {
        res.send({ message: "Token is not there or expired" });
      }
      res.send({ user: token });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
}
const authentication = new Authentication();
module.exports = { authentication };
