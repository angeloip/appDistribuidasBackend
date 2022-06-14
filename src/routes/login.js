const express = require("express");
const { createLogin, createLoginWithGoogle } = require("../controllers/login");

const router = express.Router();

router.post("/", createLogin);

router.post("/google/", createLoginWithGoogle);

module.exports = router;
