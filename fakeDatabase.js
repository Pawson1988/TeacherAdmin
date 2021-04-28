const mongoose = require("mongoose");
const privateClass = require("./models/classesModel");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(`mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.3wcla.mongodb.net/ProjectYelpCamp?retryWrites=true&w=majority`, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false
}).catch(err => {
    console.log(err)
});




// const class1 = new privateClass({
//     student: "Monday Student 1",
//     day: "Monday",
//     startTime: "01:00",
//     endTime: "02:00",
//     price: 20,
//     duration: 1
// });

// class1.save();


// privateClass.deleteMany({}, (err) => {
//     if(err){
//         console.log(err)
//     }})
