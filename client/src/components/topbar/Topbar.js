import "./topbar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Search } from "@material-ui/icons";
export default function Topbar() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const loggingOut = () => {
    for (let i = 0; i < localStorage.length; i++) {
      let x = localStorage.key(i);
      localStorage.removeItem(x);
    }
    window.location.reload();
  };
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
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
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SocialMeet</span>
        </Link>
      </div>
      <div className="topbarCenter">
        {
          //<div className="searchBar">
          //   <Search className="searchIcon" />
          //   <input
          //     type="text"
          //     className="searchInput"
          //     placeholder="Search for friend"
          //   />
          // </div>
          //
        }
      </div>

      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="topbarLink">Homepage</span>
          </Link>

          <Link
            to={`/profile/${user.username}`}
            style={{ textDecoration: "none" }}
          >
            <span className="topbarLink">Timeline</span>
          </Link>
        </div>

        <Link to="/login" style={{ textDecoration: "none" }}>
          <span className="topbarLogOut" onClick={loggingOut}>
            LogOut
          </span>
        </Link>

        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
