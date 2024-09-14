const path = require("path");
const staticRouter = require("./routes/staticRouter");

const cookieParser = require("cookie-parser");
const { restrictToLoggedInUserOnly, checkAuth }  = require("./middleware/authMiddleware")


//Start server
const express = require("express");
const app = express();
const PORT = 8002;

//Generate Router
const urlRouter = require("./routes/urlRoute")
const userRouter = require("./routes/userRouter");

//Connection to mongoDB
const { connectToMongoDB } = require("./connection");

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

connectToMongoDB("mongodb+srv://miteshjuikar:URLShortner@mycluster.krravcy.mongodb.net/")
                .then(console.log("MongoDB connected successfully"))
                .catch((err)=>console.log(`Error: ${err}`)
                );

app.set("view engine", "ejs");
app.set("views", path.resolve("./viewsFolder"));

app.use("/", checkAuth, staticRouter);
app.use("/url", restrictToLoggedInUserOnly, urlRouter);
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server is started at ${PORT}`));