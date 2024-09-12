const express = require("express");
const { handleGenerateNewUrl, handleRedirectToMainURL } = require("../controllers/ulrController")

const router = express.Router();

router.route("/")
.post(handleGenerateNewUrl);

router.route("/:id")
.get(handleRedirectToMainURL);



module.exports = router;