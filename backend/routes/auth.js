const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res)=>{
    

    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        console.log(err);
    }
})

//LOGIN
router.post("/login", async (req, res)=>{
    try{
        const user  = await User.findOne({email : req.body.email});
        if(!user){
            res.status(404).json("user not found");
        }else{
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if(!validPassword){
                res.status(400).json("Wrong Credentials!");
            }else{
                const token = jwt.sign({id: user._id}, "secretkey")
                const {password, ...others} = user;
                res.cookie("accessToken", token, {
                    httpOnly: true,
                }).status(200).json(others);
            }
        }
    }catch(err){
        res.status(500).json(err);
    }
    
})

//LOGOUT
router.post("/logout", async (req, res)=>{
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out!")
    
})
module.exports = router;