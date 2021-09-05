import "./sidebar.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [friends, setFriends] = useState([]);
  const [postLength, setPostLength] = useState();
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  useEffect(() => {
    const fetchPostLength = async () => {
      const len = await axios.get(`/posts/profile/${currentUser.username}`);
      console.log(len.data.length);
      setPostLength(len.data.length);
    };
    fetchPostLength();
  }, [currentUser]);
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          "/users/followers/" + currentUser._id
        );
        console.log(friendList.data);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [currentUser]);
  useEffect(() => {
    const getuser = async () => {
      try {
        const user2 = await axios.get("/users/have/" + currentUser._id);
        setUser(user2.data);
      } catch (err) {}
    };
    getuser();
  }, [user]);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarUser">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="sidebarImg"
          />
          <span className="sidebarUsername">{user.username}</span>
          <span className="sidebarDesc">{user.desc}</span>
        </div>
        <div className="sidebarTableWrapper">
          <table style={{ border: "1" }} className="sidebarTable">
            <tr className="sidebarTableRow">
              <th className="sidebarTableColumnHeading">
                {user.followers.length}
              </th>
              <th className="sidebarTableColumnHeading">
                {user.followings.length}
              </th>
              <th className="sidebarTableColumnHeading">{postLength}</th>
            </tr>
            <tr className="sidebarTableRow">
              <td className="sidebarTableColumn">Followers</td>
              <td className="sidebarTableColumn">Followings</td>
              <td className="sidebarTableColumn">Posts</td>
            </tr>
          </table>
        </div>

        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {friends.map((friend) => (
            <li className="sidebarFriend">
              <Link to={"/profile/" + friend.username}>
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="sidebarFriendImg"
                />
              </Link>
              <Link
                to={"/profile/" + friend.username}
                style={{ textDecoration: "none" }}
              >
                <span className="sidebarFriendName">{friend.username}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
