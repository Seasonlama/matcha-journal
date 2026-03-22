const mongoose = require("mongoose")

const matchaSchema = new mongoose.Schema({

name:String,
brand:String,
rating:Number,
notes:String,
image:String,
userId:String

})

module.exports = mongoose.model("Matcha", matchaSchema)