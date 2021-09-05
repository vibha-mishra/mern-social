import "./socialmeet.css";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Link } from "@material-ui/core";
export default function SocialMeet() {
  const history = useHistory();
  const handleLoginPage = () => {
    history.push("/login");
    // window.location.reload();
  };
  const handleRegisterPage = () => {
    history.push("/register");
  };
  return (
    <div className="socialmeet">
      <div className="socialmeetWrapper">
        <div className="socialmeetLeft">
          <h3 className="socialmeetLogo">SocialMeet</h3>
          <span className="socialmeetDesc">
            Connect with friends and the world around you on SocialMeet.
          </span>
        </div>
        <div className="socialmeetRight">
          <Link to="/login">
            <button className="socialmeetLoginButton" onClick={handleLoginPage}>
              Login
            </button>
          </Link>
          <Link to="/register">
            <button
              className="socialmeetRegisterButton"
              onClick={handleRegisterPage}
            >
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
