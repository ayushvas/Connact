import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";


const Profile = () => {
  const userid = useLocation().pathname.split("/")[2];
  console.log(userid);
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await makeRequest.get("/users/" + userid);
        console.log(res);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    if(userid === currentUser._id){
      console.log("You can't follow yourself");
    }else{
      try{
        const res = await makeRequest.put("/users/follow/" + userid);
        console.log(res);
      }catch(err){
        console.log(err);
      }
    }
    
  }


  const {currentUser} = useContext(AuthContext);
  return (
    <div className="profile">
      <div className="images">
        <img className="cover" src="https://images.pexels.com/photos/259915/pexels-photo-259915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt = ""/>
        <img className="profilePic" src = {currentUser.profilePic} alt=""/>
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
          <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="medium" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="medium" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="medium" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="medium" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="medium" />
            </a>
          </div>
          <div className="center">
          {user && <span>{user.username}</span>}
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>USA</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>lama.dev</span>
              </div>
            </div>
            <button onClick={handleClick}>follow</button>
          </div>
          <div className="right">
          <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        <Posts/>
      </div>
    </div>
  )
}

export default Profile