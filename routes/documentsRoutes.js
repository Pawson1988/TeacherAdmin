const fs = require("fs");
const express = require("express");
const router = express.Router();

// page to display the documents to open. 
router.get("/", (req, res) => {
    let dirPath = "./PDFs";
    const PDFFiles = fs.readdirSync(dirPath);

    res.render("documents", { PDFFiles });
})

//practice with file system
router.post("/:pdf", (req, res) => {

    const { pdf } = req.params;
    let URLPath = `./PDFs/${pdf}`;
    fs.readFile(URLPath, (err, data) => {
        if (err){
            console.log(err)
        } 
        res.contentType("application/pdf");
        res.send(data);
    })
})

module.exports = router;