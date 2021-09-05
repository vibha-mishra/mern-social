import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState, useEffect } from "react";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  //By using useEffect Hook we tell React that our component needs to do something after render.
  //hooks always work in functional component.
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await (username
        ? axios.get("/posts/profile/" + username)
        : axios.get("posts/timeline/" + user._id));
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt); //sorting posts according to time..latest post will be seen first
        })
      );
    };
    fetchPosts();
  }, [username, user._id]); //empty array allows useEffect to run only for once
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
