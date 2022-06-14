const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/users");

const createLogin = async (req, res) => {
  const { body } = req;
  const { email, password } = body;

  const user = await userSchema.findOne({ email });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    res.status(400).json({ errorMessage: "Invalid user or password" });
  } else {
    const userForToken = {
      id: user._id,
      email: user.email
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    res.send({
      id: user._id,
      name: user.name,
      email: user.email,
      token: token
    });
  }
};

const createLoginWithGoogle = async (req, res) => {
  const { body } = req;
  const { email } = body;

  const user = await userSchema.findOne({ email });

  if (!user) {
    res.status(400).json({ errorMessage: "Invalid user or password" });
  } else {
    const userForToken = {
      id: user._id,
      email: user.email
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    res.send({
      id: user._id,
      name: user.name,
      email: user.email,
      token: token
    });
  }
};

module.exports = { createLogin, createLoginWithGoogle };
