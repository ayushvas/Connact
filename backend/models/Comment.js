const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    desc : {
        type : String, 
    },
    userid : {
        type : String, 
        require : true,
    },
    postid : {
        type : String, 
        require : true,
    }
}, {timestamps : true})

module.exports = mongoose.model("comment", CommentSchema);