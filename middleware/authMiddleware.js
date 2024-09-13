const { getUser } = require("../service/auth");

async function restrictToLoggedInUserOnly(req, res){
    const userUid = req.cookies.uid;

    if(!userUid)
        return res.redirect("login", { error: "userUid"})
}
