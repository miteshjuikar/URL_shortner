const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");
const { setUser, getUser } = require("../service/auth");

async function handleUserSignUp(req,res){
    const { name,email,password} = req.body;
    await User.create({
        name,
        email,
        password
    }).catch((err) => res.status(400).json({ error:"Something missing"}));
    console.log(`${name}, ${email}, ${password}`);
    
    return res.render("home");
}

async function handleUserLogin(req,res){
    const { email, password } =  req.body;
    const userLog = await User.findOne({ email, password });
    if(!userLog) 
        return res.render("login", { error: "Invalide username or password"});
    const sessionId = uuidv4;
    setUser(sessionId, userLog);
    res.cookie("uid", sessionId);
    return res.render("home");
}

module.exports = { handleUserSignUp, handleUserLogin };