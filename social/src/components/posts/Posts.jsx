import { useContext, useState, useEffect } from "react";
import { makeRequest } from "../../axios";
import Post from "../post/Post";
import "./posts.scss"

const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await makeRequest.get("/posts/timeline/");
        // console.log(res);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, []);
  console.log(posts);
  return (
    <div className="Posts">
      {posts.map(post=>(
        post && <Post post = {post} key={post._id}/>
      ))}
    </div>
  )
}

export default Posts