const express = require("express");
const router = express.Router();
const privateClass = require("../models/classesModel");


// view Stats page
router.get("", async(req, res) => {
    const classes = await privateClass.find({}, (err, doc) => {
        if(err){
            console.log(err);
        } else {
            return doc;
        }
    });
    res.render("stats", { classes });
})

module.exports = router;