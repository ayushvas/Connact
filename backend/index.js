const express = require("express");
const app = express();
const dotenv = require("dotenv");
const helmet = require("helmet")
const morgan = require("morgan");
const mongoose = require("mongoose")
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");
const likeRoute = require("./routes/likes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("DB connection successful")})
.catch((err)=>{console.log(err)});

//middleware
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Credentials", true);
    next();
})
app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../social/public/upload')
    },
    filename: function (req, file, cb) {
   
      cb(null, Date.now() + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req, res)=>{
    const file = req.file;
    res.status(200).json(file.filename)
})

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);
app.use("/api/likes", likeRoute);

app.listen(8800, ()=>{
    console.log("Backend server is running!")
})