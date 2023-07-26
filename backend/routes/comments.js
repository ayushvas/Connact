const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Comment  = require("../models/Comment");
const jwt = require("jsonwebtoken");

//CREATEPOST
router.post("/", async(req, res)=>{
    const newComment = new Comment(req.body)
    try{
        const token = req.cookies.accessToken;
        if(!token){
            res.status(401).json("login first!");
        }else{
            
            jwt.verify(token, "secretkey", (err, userInfo)=>{
                if(err){
                    return res.status(403).json("Token is invalid!");
                }
            })
            const savedComment = await newComment.save();
            res.status(200).json(savedComment);
        }
    }catch(err){
        res.status(500).json(err);
    }
})

//GET TIMELINE POSTS

//NEED TO SORT THESE POSTS TOO
router.get("/timeline/:postid", async (req, res)=>{
    try{
        const token = req.cookies.accessToken;
        // console.log(token);
        let postid = "";
        if(!token){
            res.status(401).json("login first!");
        }else{
            
            jwt.verify(token, "secretkey", (err, userInfo)=>{
                if(err){
                    return res.status(403).json("Token is invalid!");
                }else{
                    postid = req.params.postid;
                }
            })
            
            
            const postComments = await Comment.find({postid: postid});
            
            res.json(postComments);
        }
        
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})
module.exports = router;