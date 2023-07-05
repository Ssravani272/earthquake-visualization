const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    DateTime:{
        type: Date,
        required: true
    },
    Region:{
        type: String,
        required: true
    },
    Magnitude:{
        type: String
    },
    Latitude:{
        type:String
    },
    Longtitude:{
        type: String
    }
})
const Data= mongoose.model("Data",dataSchema)
module.exports= Data;