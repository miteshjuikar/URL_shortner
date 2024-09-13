const path = require("path");
const staticRouter = require("./routes/staticRouter");

//Start server
const express = require("express");
const app = express();
const PORT = 8002;

//Generate Router
const urlRoute = require("./routes/urlRoute")

//Connection to mongoDB
const { connectToMongoDB } = require("./connection");

connectToMongoDB("mongodb://127.0.0.1:27017/short_url")
                .then(console.log("MongoDB connected successfully"))
                .catch((err)=>console.log(`Error: ${err}`)
                );

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set("view engine", "ejs");
app.set("views", path.resolve("./viewsFolder"));


app.use("/", staticRouter);
app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`Server is started at ${PORT}`));