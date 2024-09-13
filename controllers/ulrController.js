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
    .then(() => res.render("home", { id: shortId }))
    .catch((err) => {
                        console.log(`Error: ${err}`);
                        return res.end("<h1>Error occurs while exicuting DB operations</h1>");
                    });
    // return res.render("home", { id: shortId });
    // return res.status(200).json({id: shortId });
    
}


async function handleRedirectToMainURL(req, res){
    const shortId = req.params.id;
    
    const entry = await URL.findOneAndUpdate(
        {shortId}, {
            $push: { 
                visitHistory: { timestamp: Date.now () }
            }
        }
    );    
    res.redirect(entry.redirectURL);
}

async function handleGetAnalysisDetails(req, res){
    const shortId = req.params.id;
    const result = await URL.findOne({shortId})
    return res.json({
        totalClick: result.visitHistory.length,
        analysis: result.visitHistory
    })
}

module.exports = { handleGenerateNewUrl, handleRedirectToMainURL, handleGetAnalysisDetails };