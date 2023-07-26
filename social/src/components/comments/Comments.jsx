import { useContext, useState, useEffect } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";



const Comments = ({postid}) => {

    const  {currentUser} = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [desc, setDesc] = useState("");

    const handleClick = async (e) =>{
      e.preventDefault();
      try{
        
        const completeComment = {
          desc : desc,
          userid: currentUser._id,
          postid: postid
        };
        makeRequest.post("/comments/", completeComment);
        window.location.reload();
      }catch(err){
        console.log(err);
      }
    }

      useEffect(() => {
        const getComments = async () => {
          try {
            const res = await makeRequest.get("/comments/timeline/" + postid);
            // console.log(res);
            setComments(res.data);
          } catch(err) {
            console.log(err);
          }
        };
        getComments();
      }, []);
  return (
    <div className="comments">
        <div className="write">
            <img src={currentUser.profilePic} alt = ""/>
            <input placeholder="write a comment..." onChange={(e)=>{setDesc(e.target.value)}}/>
            <button onClick={handleClick}>Send</button>
        </div>
    {
        comments.map((comment) => (
            <div className="comment">
                <img src = {comment.profilePicture} alt=""/>
                <div className="info">
                    <span>
                        {comment.name}
                    </span>
                    <p>{comment.desc}</p>
                </div>
                <span className="date">1 hour ago</span>
            </div>
        ))
    }</div>
  )
}

export default Comments