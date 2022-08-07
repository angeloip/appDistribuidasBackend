const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const authorization = req.get("authorization");

  if (!authorization) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  let token = null;

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const { id: userId } = decodedToken;
  req.userId = userId;

  next();
};

module.exports = { checkToken };
