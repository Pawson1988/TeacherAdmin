const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const classSchema = new Schema({
    day: String,
    student: String,
    startTime: String,
    endTime: String,
    price: Number,
    duration: String
})

const classModel = mongoose.model("privateClass", classSchema)

module.exports = classModel;