const router = require("express").Router();
const User = require("../models/User")
const jwt = require("jsonwebtoken");

//update user
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
          return res.status(500).json(err);
        }
      }
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("Account has been updated");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can update only your account!");
    }
  });


  //GET A USER
router.get("/:userid", async (req, res)=>{
  try{
      const token = req.cookies.accessToken;
      // console.log(token);
      let userid = "";
      if(!token){
          res.status(401).json("login first!");
      }else{
          
          jwt.verify(token, "secretkey", (err, userInfo)=>{
              if(err){
                  return res.status(403).json("Token is invalid!");
              }else{
                  // console.log(req.params);
                  userid = req.params.userid;
              }
          })
          const foundUser = await User.findOne({_id: userid});
          res.json(foundUser);
      }
      
  }catch(err){
      console.log(err);
      res.status(500).json(err);
  }
})

//FOLLOW
router.put("/follow/:userid", async (req, res)=>{
  try{
      const token = req.cookies.accessToken;
      console.log(token);
      let curUserid = "";
      let userid = "";
      if(!token){
          res.status(401).json("login first!");
      }else{
          
          jwt.verify(token, "secretkey", (err, userInfo)=>{
              if(err){
                  return res.status(403).json("Token is invalid!");
              }else{
                  console.log(userInfo);
                  curUserid = userInfo.id;
                  userid = req.params.userid;
                  
              }
          })
          const curUser = await User.findById({_id: curUserid});
          const user = await User.findById({_id: userid});
          if(user.followers.includes(curUserid)){
            await user.updateOne({$pull: {followers: curUserid}});
            await curUser.updateOne({ $pull : {followings: userid}});
            res.json("You stopped following " + user.username);
          }else{
            await user.updateOne({$push: {followers: curUserid}});
            await curUser.updateOne({ $push : {followings: userid}});
            res.json("You are now following " + user.username);
          }
          
      }
      
  }catch(err){
      console.log(err);
      res.status(500).json(err);
  }
})
module.exports = router;