const express = require("express");
const { handleGenerateNewUrl, handleRedirectToMainURL, handleGetAnalysisDetails } = require("../controllers/ulrController")

const router = express.Router();

router.route("/")
.post(handleGenerateNewUrl)

router.route("/:id")
.get(handleRedirectToMainURL);

router.route("/analysis/:id")
.get(handleGetAnalysisDetails);


module.exports = router;