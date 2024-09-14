const express = require("express");
const URL = require("../models/urlModel");

const router = express.Router();

router.get("/", async(req, res) => {
    if(!req.user){
        const allURLs = await URL.find({});
        console.log("user not logged in");
        return res.render("home", {urls : allURLs, error: "User is not logged in"} );
    }
    else{
        console.log("user logged in");
        const userGeneratedURLs = await URL.find({ createdBy: req.user._id});
        return res.render("home", {urls : userGeneratedURLs} );
    }
});

router.get("/signUp", async(req, res) => {
    return res.render("signUp");
});

router.get("/login", async(req, res) => {
    return res.render("login");
});

module.exports = router;