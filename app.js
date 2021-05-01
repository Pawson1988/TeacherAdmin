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
const { find } = require("./models/classesModel");

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
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);


//Routes
app.get("/", (req, res) => {
    res.render("home", { message: "This is the Home Page"});
});

app.get("/classes", async(req, res) => {
    const classes = await privateClass.find({}, (err, doc) => {
        if (err){
            console.log(err);
        } else {
        return doc;
    }}).sort({ startTime: 1});

    const classA = {
        student: "New Student",
        day: "New Day",
        startTime: "00:00",
        endTime: "00:00",
        price: 0,
        duration: 0
    };

    res.render("classes", { classes, classA });
});


app.post("/classes/add", async(req, res) => {
    const { days, student, startTime, endTime, price, duration } = req.body;
    const classInfo = new privateClass({
        student: student,
        day: days,
        startTime: startTime,
        endTime: endTime,
        price: price, 
        duration: duration
    });
    await classInfo.save();
    res.redirect("/classes");
});

app.delete("/classes/:id/delete", async(req, res) => {
    const {id} = req.params;
    const indClass = await privateClass.findByIdAndDelete(id, (err, doc) => {
        if(err){
            console.log(err)
        } else {
            return doc;
        }
    })
    console.log(indClass);
    res.redirect("/classes")
});

app.get("/classes/:id/edit", async(req, res) => {
    const { id } = req.params;
    const classA = await privateClass.findById(id, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            return doc; 
        }
    });
    const classes = await privateClass.find({}, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            return doc;
        }
    }).sort({ startTime: 1});
    res.render("classes", { classA, classes });
});

app.put("/classes/:id", async(req, res) => {
    const { id } = req.params;
    const { student, days, startTime, endTime, price, duration } = req.body;
    const updatedClass = {
        student: student,
        day: days,
        startTime: startTime, 
        endTime: endTime,
        price: price,
        duration: duration
    };

    await privateClass.findByIdAndUpdate(id, updatedClass);
    res.redirect("/classes");
});

app.get("/stats", async(req, res) => {
    const classes = await privateClass.find({}, (err, doc) => {
        if(err){
            console.log(err);
        }
    });
    res.render("stats", { classes });
})