const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
    userid : {
        type : String, 
        require : true,
    },
    postid : {
        type : String, 
        require : true,
    }
}, {timestamps : true})

module.exports = mongoose.model("like", LikeSchema);