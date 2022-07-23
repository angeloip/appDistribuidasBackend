const express = require("express");
const { createPayment, getPayments } = require("../controllers/payment");

const router = express.Router();

router.get("/", getPayments);

router.post("/", createPayment);

module.exports = router;
