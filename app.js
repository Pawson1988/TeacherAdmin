const express = require("express");
const app = express(); 
const ejs = require("ejs"); 
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dotenvConfig = dotenv.config();
const privateClass = require("./models/classesModel");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const nodemailer = require("nodemailer");
const transporter = require("./utils/nodemailer-auth.js");
const classesRoutes = require("./routes/classesRoutes");
const classRoutes = require("./routes/classRoutes");
const statsRoutes = require("./routes/statsRoutes");
const documentsRoutes = require("./routes/documentsRoutes");
const fs = require("fs");
const globalMiddleware = require("./utils/globalMiddleware");


//Database connection
mongoose.connect(`mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.3wcla.mongodb.net/ProjectYelpCamp?retryWrites=true&w=majority`, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false
}).catch(err => {
    console.log(err)
}).then(() => app.listen(3020, () => {
    console.log("app listening on port 3020"); 
}));



// Middleware
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use("/public/img", express.static(path.join(__dirname, 'public/img')))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.engine("ejs", ejsMate);

app.use(globalMiddleware);

//homepage route
app.get("/", (req, res) => {
    res.render("jimmyenglish");
});

//Routes middleware

app.use("/classes", classesRoutes);

app.use("/class", classRoutes);

app.use("/stats", statsRoutes);

app.use("/documents", documentsRoutes);

app.get("*", (req, res) => {
    res.send("Sorry, the page that you're looking for does not exist, checked that you typed the URL correctly or contact the systems administrator");
})

