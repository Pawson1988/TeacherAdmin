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
const { findById, findByIdAndDelete } = require("./models/classesModel");


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
//homepage route
app.get("/", (req, res) => {
    res.render("home", { message: "This is the Home Page"});
});

//view classes route
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

// add a class route
app.post("/classes/add", async(req, res) => {
    const { days, student, startTime, endTime, price, duration, email } = req.body;
    const classInfo = new privateClass({
        student: student,
        day: days,
        startTime: startTime,
        endTime: endTime,
        price: price, 
        duration: duration,
        email: email
    });
    await classInfo.save();
    res.redirect("/classes");
});

//delete a class route
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

// get classes for the edit form
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

//update a class
app.put("/classes/:id", async(req, res) => {
    const { id } = req.params;
    const { student, days, startTime, endTime, price, duration, email } = req.body;
    const updatedClass = {
        student: student,
        day: days,
        startTime: startTime, 
        endTime: endTime,
        price: price,
        duration: duration,
        email: email
    };

    await privateClass.findByIdAndUpdate(id, updatedClass);
    res.redirect("/classes");
});

//view individual class
app.get("/class/:id", async(req, res) => {
    const { id } = req.params;
    const classInfo = await privateClass.findById(id, (err, doc) => {
        if(err){
            console.log(err);
        }
    });

    console.log(classInfo);
    res.render("class", { classInfo } );
})

// view Stats page
app.get("/stats", async(req, res) => {
    const classes = await privateClass.find({}, (err, doc) => {
        if(err){
            console.log(err);
        }
    });
    res.render("stats", { classes });
})

// add a note to student's file route
app.post("/class/:id/note", async(req, res) => {
    const { id } = req.params;
    const classNote = await privateClass.findById(id, (err, doc) => {
        if(err){
            console.log(err)
        } else {
            return doc;
        }
    });
    const { noteTitle, noteBody } = req.body;

    const note = {
        noteTitle: noteTitle,
        noteBody: noteBody
    }

    classNote.note.push(note);
    await privateClass.findByIdAndUpdate(id, classNote, err => {
        if(err){
            console.log(err);
        }
    });
    res.redirect(`/class/${id}`);
})

// delete comment from the current class route. 
app.delete("/class/:id/:classId/delete", async(req, res) => {
    const { id, classId } = req.params;
    console.log(id);
    console.log(classId);
    await privateClass.findOneAndUpdate({ _id: classId }, {"$pull": { "note": {"_id": id}}}, err => {
        if(err){
            console.log(err);
        }
    });
    res.redirect(`/class/${classId}`);
})


// Send an email route 
app.post("/class/:id/email", async(req, res) => {
    
    const { id } = req.params;

    const student = await privateClass.findById(id);
    
    const mailOptions = {
        from: "pawson1988@me.com",
        to: `${student.email}`,
        subject: "Email from my code program!",
        text: "Do you want thousands of emails?",
        html: "<h1>This is a header<h1><br><p>This is just a paragraph</p>"
    };
    
    transporter.sendMail(mailOptions, (err, info) => {
        if (err){
            console.log(err);
        } else {
            console.log("Email Sent " + info.response);
        }
    });

    res.redirect("/classes");
})