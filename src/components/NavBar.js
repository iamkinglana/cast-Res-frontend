import { Link, useNavigate } from "react-router-dom";
import Logout from './Logout';
import { useState } from "react";

function NavBar({ setCurrentUser }) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
    }).then((resp) => {
      if (resp.ok) {
        setCurrentUser({});
        navigate("/");
      }
    });
  };

  return (
    <div className="navbar">
      <img src="Cast.png" alt="pic" className="logo-img" />
      <Link to="/find">
        <button className="navbar-btn">Find</button>
      </Link>
      <Link to="/create">
        <button className="navbar-btn">Create</button>
      </Link>
      <Link to="/my-favorites">
        <button className="navbar-btn">Favorites</button>
      </Link>
      <Link to="/my-profile">
        <button className="navbar-btn">Profile</button>
      </Link>
      <button className="navbar-btn-logout" onClick={() => setButtonPopup(true)}>
        Logout
      </button>
      <Logout trigger={buttonPopup} setTrigger={setButtonPopup} handleLogout={handleLogout} />
    </div>
  );
}

export default NavBar;
