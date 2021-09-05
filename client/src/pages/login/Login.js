import "./login.css";
import { useRef, useContext } from "react";
import { loginCall } from "../../apiCalls";
import { CircularProgress, Link } from "@material-ui/core";
import { AuthContext } from "../../context/AuthContext";
export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const registerPage = () => {
    window.location.reload();
  };
  const handleClick = (e) => {
    e.preventDefault(); //prevents the refreshment of page
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SocialMeet</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on SocialMeet.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              type="email"
              required
              placeholder="Email"
              className="loginInput"
              ref={email}
            />
            <input
              type="password"
              placeholder="Password"
              minLength="6"
              className="loginInput"
              ref={password}
              required
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            
          </form>
        </div>
      </div>
    </div>
  );
}
