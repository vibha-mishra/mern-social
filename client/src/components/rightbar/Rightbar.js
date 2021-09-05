import "./rightbar.css";
import { Users } from "../../DummyData";
import Online from "../online/Online";
import EditProfile from "../../components/editProfile/EditProfile";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user ? user._id : "")
  );
  console.log(followed);
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/followings/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);
  useEffect(() => {
    const getallusers = async () => {
      try {
        const allUsersList = await axios.get("/users/allusers");
        console.log(allUsersList);
        setAllUsers(allUsersList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getallusers();
  }, []);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (err) {}
    console.log("before setting", followed);
    setFollowed(!followed);
    console.log("after setting", followed);
  };
  console.log(currentUser.username);
  const HomeRightbar = () => {
    return (
      <div>
        <div className="birthdayContainer">
          {
            //<img src="assets/gift.png" alt="" className="birthdayImg" />
            // <span className="birthdayText">
            //   <b>Vaibhav Mishra</b>and <b>3 other friends have</b> birthday today.
            // </span>
          }
        </div>
        <img src="assets/ad.png" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">People you may know</h4>
        <ul className="rightbarFriendList">
          {allUsers.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </div>
    );
  };
  const ProfileRightbar = () => {
    return (
      <div>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        {user.username === currentUser.username ? (
          <EditProfile key={user.id} user={user} />
        ) : null}
        <div className="rightbarInfo"></div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{user.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">{user.from}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">
            {user.relationship === 1
              ? "Single"
              : user.relationship === 2
              ? "Married"
              : "-"}
          </span>
        </div>

        <h4 className="rightbarTitle">Followings</h4>
        <ul className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <li className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span
                  className="rightbarFollowingName"
                  style={{ textDecoration: "none" }}
                >
                  {friend.username}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
