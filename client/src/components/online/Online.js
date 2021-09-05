import "./online.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
export default function Online({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  // console.log(u);
  return (
    <div>
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <Link
            to={`profile/${user.username}`}
            style={{ textDecoration: "none" }}
          >
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
              className="rightbarProfileImg"
            />
          </Link>
        </div>
        <Link
          to={`profile/${user.username}`}
          style={{ textDecoration: "none" }}
        >
          <span className="rightbarUsername">{user.username}</span>
        </Link>
      </li>
    </div>
  );
}
