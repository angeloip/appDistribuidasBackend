const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/users");

const createLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await userSchema.findOne({ email });

  if (!user)
    return res.status(401).json({ errorMessage: "Invalid email or password" });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    res.status(401).json({ errorMessage: "Invalid email or password" });
  } else {
    const userForToken = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    res.send({
      id: user._id,
      name: user.name,
      email: user.email,
      token: token,
      role: user.role
    });
  }
};

const createLoginWithGoogle = async (req, res) => {
  const { email } = req.body;

  const user = await userSchema.findOne({ email });

  if (!user) {
    res.status(401).json({ errorMessage: "Invalid email or password" });
  } else {
    const userForToken = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    res.send({
      id: user._id,
      name: user.name,
      email: user.email,
      token: token,
      role: user.role
    });
  }
};

module.exports = { createLogin, createLoginWithGoogle };
