const URL = require("../models/urlModel");
const generateShortID = require("shortid");

async function handleGenerateNewUrl(req,res){
    const body = req.body;
    
    if(!body.url) return res.status(400).json({ error:"URL is required"});
    
    const shortId = generateShortID();
    
    // console.log(`${body.url} and ${shortId}`);
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    })

    return res.status(200).json({id: shortId });
}

module.exports = { handleGenerateNewUrl };