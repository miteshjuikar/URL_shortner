const express = require("express");
const URL = require("../models/urlModel");

const router = express.Router();

router.get("/", async(req, res) => {
    const allURLs = await URL.find({});
    return res.render("home", {urls : allURLs} );
});

router.get("/signUp", async(req, res) => {
    return res.render("signUp");
});

router.get("/login", async(req, res) => {
    return res.render("login");
});

module.exports = router;