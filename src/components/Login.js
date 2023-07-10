import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from '../assets/hotdog03.jpg';

function Login({ setCurrentUser }) {
  const [userLog, setUserLog] = useState("");
  const [passLog, setPassLog] = useState("");
  const [nameSign, setNameSign] = useState("");
  const [userSign, setUserSign] = useState("");
  const [passSign, setPassSign] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  function onSignupSubmit(e) {
    e.preventDefault();
    const user = { name: nameSign, username: userSign, password: passSign };

    fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
          setHasSignedUp(true);
          setIsLoggedIn(true);
        } else {
          res.json().then((errorData) => setErrors(errorData.errors));
        }
      });
  }

  function onLoginSubmit(e) {
    e.preventDefault();
    const user = { username: userLog, password: passLog };

    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((user) => {
            setCurrentUser(user);
            setIsLoggedIn(true);
            navigate("/find");
          });
        } else {
          res.json().then((errorData) => setErrors(errorData.errors));
        }
      });
  }

  const imageHoverEnter = (e) => {
    e.target.src = "Cast.png";
  };

  const imageHoverExit = (e) => {
    e.target.src = "Cast.png";
  };

  return (
    <div>
      <div style={{ backgroundImage: `url(${backgroundImage})` }} className="flex-container">
        <div className="welcome-header">
          <img className="welcome-img" src="" alt="welcome-img" />
        </div>
        <div className="flex-container">
          <div className="welcome">
            <img
              className="welcome-img"
              src="Cast.png"
              alt="welcome-img"
              onMouseEnter={imageHoverEnter}
              onMouseLeave={imageHoverExit}
            />
          </div>
          <div className="login-form-container">
            {!isLoggedIn && !hasSignedUp && (
              <div className="login-form-content-bottom">
                <form className="sign-up-form" onSubmit={onSignupSubmit}>
                  <input
                    className="form-inputs"
                    placeholder="First and Last Name"
                    type="text"
                    value={nameSign}
                    onChange={(e) => setNameSign(e.target.value)}
                  />
                  <input
                    className="form-inputs"
                    placeholder="Username"
                    type="text"
                    value={userSign}
                    onChange={(e) => setUserSign(e.target.value)}
                  />
                  <input
                    className="form-inputs"
                    placeholder="Password"
                    type="password"
                    value={passSign}
                    onChange={(e) => setPassSign(e.target.value)}
                  />
                  <button className="form-input-btn" type="submit">
                    Signup
                  </button>
                </form>
              </div>
            )}

            {!isLoggedIn && (
              <div className="login-form-content-top">
                <form className="login-form" onSubmit={onLoginSubmit}>
                  <input
                    className="form-inputs"
                    placeholder="Username"
                    type="text"
                    value={userLog}
                    onChange={(e) => setUserLog(e.target.value)}
                  />
                  <input
                    className="form-inputs"
                    placeholder="Password"
                    type="password"
                    value={passLog}
                    onChange={(e) => setPassLog(e.target.value)}
                  />
                  <button className="form-input-btn" type="submit">
                    Login
                  </button>
                </form>
              </div>
            )}

            {isLoggedIn && (
              <div className="login-form-content-top">
                <h2>Signup Successful!</h2>

                <form className="login-form" onSubmit={onLoginSubmit}>
                  <input
                    className="form-inputs"
                    placeholder="Username"
                    type="text"
                    value={userLog}
                    onChange={(e) => setUserLog(e.target.value)}
                  />
                  <input
                    className="form-inputs"
                    placeholder="Password"
                    type="password"
                    value={passLog}
                    onChange={(e) => setPassLog(e.target.value)}
                  />
                  <button className="form-input-btn" type="submit">
                    Login
                  </button>
                </form>
              </div>
            )}

            <div className="error-message">
              {errors && errors.map((error) => <p key={error}>{error}</p>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
