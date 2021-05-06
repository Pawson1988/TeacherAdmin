const express = require('express');
const router = express.Router();
const privateClass = require("../models/classesModel");

//view classes route
router.get("/", async(req, res) => {
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
router.post("/add", async(req, res) => {
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
router.delete("/:id/delete", async(req, res) => {
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
router.get("/:id/edit", async(req, res) => {
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
router.put("/:id", async(req, res) => {
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

module.exports = router;
