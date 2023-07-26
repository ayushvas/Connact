const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    desc : {
        type : String, 
    },
    img : {
        type : String, 
    },
    userid : {
        type : String, 
        require : true,
    }, 
    name : {
        type: String, 
        require: true,
    }
}, {timestamps : true})

module.exports = mongoose.model("post", PostSchema);