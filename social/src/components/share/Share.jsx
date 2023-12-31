import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { makeRequest } from "../../axios";

const Share = () => {
  
  const {currentUser} = useContext(AuthContext)

  const [file, setFile] = useState(null);
  const [post, setPost] = useState("");

  const upload = async ()=>{
    try{
      const formData = new FormData();
      formData.append("file", file)
      const res = await makeRequest.post("/upload", formData);
      console.log(res);
      return res.data;
    }catch(err){
      console.log(err);
    }
  }
  
  const handleClick = async (e) =>{
    e.preventDefault();

    try{
      let imgUrl = "";
      if(file){
        imgUrl = await upload();
      }
      const completePost = {
        desc : post,
        userid: currentUser._id,
        img : imgUrl,
        name: currentUser.username
      };
      makeRequest.post("/posts/", completePost);
      window.location.reload();
    }catch(err){
      console.log(err);
    }
  }



  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img
            src={currentUser.profilePic}
            alt=""
          />
          <input type="text" placeholder={`What's on your mind ${currentUser.username}?`} onChange={(e) => {setPost(e.target.value)}}/>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} onChange={(e) => {setFile(e.target.files[0])}}/>
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
