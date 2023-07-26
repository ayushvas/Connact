import "./leftBar.scss"
import Friends from "../../assets/1.png"
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={currentUser.profilePic} alt=""/>
            <span>{currentUser.username}</span>
          </div>
          <div className="item">
          <img src={Friends} alt=""/>
            <span>Friends</span>
          </div>
        </div>
        <hr/>
      </div>
    </div>
  )
}

export default LeftBar