import "./register.css";
import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">SocialMeet</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleClick}>
            <label className="registerLabel">Username :</label>
            <input
              placeholder="Username"
              required
              className="registerInput"
              ref={username}
            />
            <label className="registerLabel">Email :</label>
            <input
              placeholder="Email"
              required
              className="registerInput"
              ref={email}
              type="email"
            />
            <label className="registerLabel">Password :</label>
            <input
              placeholder="Password"
              required
              className="registerInput"
              ref={password}
              type="password"
              minLength="6"
            />
            <label className="registerLabel">Confirm Password :</label>
            <input
              placeholder="Confirm Password"
              required
              className="registerInput"
              ref={passwordAgain}
              type="password"
              minLength="6"
            />
            {
              //<label className="registerLabel">Description :</label>
              // <input
              //   placeholder="Description"
              //   className="registerInput"
              //   ref={desc}
              //   type="text"
              //   minLength="6"
              // />
              // <label className="registerLabel">Upload Profile Picture :</label>
              // <input
              //   placeholder="Upload Profile Picture"
              //   type="file"
              //   className="registerInput"
              //   accept="image/*"
              //   ref={profilePicture}
              // />
              // <label className="registerLabel">Upload Cover Picture :</label>
              // <input
              //   placeholder="Upload Cover Picture"
              //   type="file"
              //   className="registerInput"
              //   accept="image/*"
              //   ref={coverPicture}
              // />
            }

            <button className="registerButton" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
