const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//CREATEPOST
router.post("/", async(req, res)=>{
    const newPost = new Post(req.body)
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
            const savedPost = await newPost.save();
            res.status(200).json(savedPost);
        }
    }catch(err){
        res.status(500).json(err);
    }
})

//GET TIMELINE POSTS

//NEED TO SORT THESE POSTS TOO
router.get("/timeline", async (req, res)=>{
    try{
        const token = req.cookies.accessToken;
        // console.log(token);
        let id = "";
        if(!token){
            res.status(401).json("login first!");
        }else{
            
            jwt.verify(token, "secretkey", (err, userInfo)=>{
                if(err){
                    return res.status(403).json("Token is invalid!");
                }else{
                    id = userInfo.id;
                }
            })
            
            const currentUser = await User.findById(id);
            const userPosts = await Post.find({userid: currentUser._id});
            const friendsPosts = await Promise.all(
                currentUser.followings.map((friendid)=>{
                    return Post.find({userid: friendid});
                })
            );
            console.log(userPosts);
            console.log(friendsPosts);
            res.json(userPosts.concat(...friendsPosts));
        }
        
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})
module.exports = router;