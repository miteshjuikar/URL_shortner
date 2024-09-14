const { getUser } = require("../service/authJWT");

async function restrictToLoggedInUserOnly(req, res, next){
    const userUid = req.cookies.uid;
    if(!userUid)
        return res.render("home", { error: "User not logged in error from middleware"});
    console.log(userUid);
    
    const user = getUser(userUid);
    if (!user) 
        return res.redirect("/login");
    req.user = user;
    next();
}

async function checkAuth(req, res, next){
    const userUid = req.cookies.uid;

    const user = getUser(userUid);

    req.user = user;
    next();
}

module.exports = {  restrictToLoggedInUserOnly,
                    checkAuth
                 };
