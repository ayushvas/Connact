import "./post.scss"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Comments from "../comments/Comments";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

const Post = ({post}) => {

    const {currentUser} = useContext(AuthContext);
    const [commentOpen, setCommentOpen] = useState(false);
    const [likes, setLikes] = useState([]);
    const [liked, setLiked] = useState(false);
  useEffect(() => {
    const getLikes = async () => {
      try {
        const res = await makeRequest.get("/likes/timeline/" + post._id);
        console.log(res);
        setLikes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getLikes();
  }, []);
    
  useEffect(() => {
    const getLiked = async () => {
      try {
        const res = await makeRequest.get("/likes/user/" + post._id + "?userid=" + currentUser._id);
        console.log(res);
        if(res.data){
            setLiked(true);
        }
        
      } catch (err) {
        console.log(err);
      }
    };
    getLiked();
  }, []);
    
  console.log(liked);
  const handleClick = async (e) =>{
    e.preventDefault();
    if(liked){
        try {
            const res = await makeRequest.delete("/likes/delete/" + post._id + "?userid=" + currentUser._id);
            console.log(res);
            
            
          } catch (err) {
            console.log(err);
          }
    }else{
        try {
            const newLike = {
                userid: currentUser._id,
                postid: post._id
            }
            const res = await makeRequest.post("/likes/", newLike);
            console.log(res);
            
            
          } catch (err) {
            console.log(err);
          }
    }
    setLiked(!liked)
  }

  return (
    <div className="post">
    <div className="container">
        <div className="user">
            <div className="userInfo">
                <img src={post.profilePic} alt=""/>
                <div className="details">
                    <Link to={`/profile/${post.userid}`} style={{textDecoration:"none", color:"inherit"}}>
                        <span className="name">{post.name}</span>
                    </Link>
                        <span className="date">1 min ago</span>
                    
                </div>
            </div>
            <MoreHorizIcon/>
        </div>
        <div className="content">
            <p>{post.desc}</p>
            <img src={"./upload/" + post.img} alt=""/>
        </div>
        <div className="info">
            <div className="item" onClick={handleClick}>
                {liked ? <FavoriteOutlinedIcon/> : <FavoriteBorderOutlinedIcon/>}
                {likes.length} likes
            </div>
            <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                <TextsmsOutlinedIcon/>
                12 comments
            </div>
            <div className="item">
                <ShareOutlinedIcon/>
                Share
            </div>
        </div>
        {commentOpen && <Comments postid = {post._id}/>}
    </div>
    </div>
  )
}

export default Post