const express = require("express");
const { handleGenerateNewUrl } = require("../controllers/ulrController")

const router = express.Router();

router.post("/", handleGenerateNewUrl);

module.exports = router;