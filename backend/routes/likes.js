const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Comment  = require("../models/Comment");
const Like  = require("../models/Like");
const jwt = require("jsonwebtoken");

//CREATE A NEW LIKE
router.post("/", async(req, res)=>{
    const newLike = new Like(req.body)
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
            const savedLike= await newLike.save();
            res.status(200).json(savedLike);
        }
    }catch(err){
        res.status(500).json(err);
    }
})


//GET NUMBER OF LIKES
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
            
            const postLikes = await Like.find({postid: postid});
            
            res.json(postLikes);
        }
        
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})


//GET A USER'S LIKE
router.get("/user/:postid", async (req, res)=>{
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
                    // console.log(req.params);
                    postid = req.params.postid;
                }
            })
            const userid = req.query.userid;
            // console.log(req.query);
            const postLikes = await Like.findOne({userid: userid, postid: postid});
            console.log(postLikes);
            res.json(postLikes);
        }
        
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

//DELETE A LIKE
router.delete("/delete/:postid", async (req, res)=>{
    try{
        const token = req.cookies.accessToken;
        console.log(token);
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
            console.log(postid);
            const userid = req.query.userid;
            await Like.deleteOne({userid: userid, postid: postid});
            
            res.json("deleted");
        }
        
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})
module.exports = router;