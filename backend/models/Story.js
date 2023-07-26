const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
    img : {
        type : String, 
        require: true,
    },
    userid : {
        type : String, 
        require : true,
    }
}, {timestamps : true})

module.exports = mongoose.model("story", StorySchema);