const express = require("express");
const router = express.Router();
const privateClass = require("../models/classesModel");
const transporter = require("../utils/nodemailer-auth.js");

//view individual class
router.get("/:id", async(req, res) => {
    const { id } = req.params;
    const classInfo = await privateClass.findById(id, (err, doc) => {
        if(err){
            console.log(err);
        } else {
            return doc;
        }
    });
    res.render("class", { classInfo } );
})

// add a note to student's file route
router.post("/:id/note", async(req, res) => {
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

// delete note from the current class route. 
router.delete("/:id/:classId/delete", async(req, res) => {
    const { id, classId } = req.params;
    await privateClass.findOneAndUpdate({ _id: classId }, {"$pull": { "note": {"_id": id}}}, err => {
        if(err){
            console.log(err);
        }
    });
    res.redirect(`/class/${classId}`);
})


// Send an email route 
router.post("/:id/email", async(req, res) => {
    
    const { id } = req.params;
    const {emailTitle, emailBody} = req.body;

    const student = await privateClass.findById(id);
    
    const mailOptions = {
        from: "pawson1988@me.com",
        to: `${student.email}`,
        subject: `${emailTitle}`,
        text: `${emailBody}`
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

module.exports = router;