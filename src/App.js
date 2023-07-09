import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Find from './components/Find';
import RestaurantDetails from './components/RestaurantDetails';
import Create from './components/Create';
import Favorites from './components/Favorites';
import Profile from './components/Profile';
import Logout from './components/Logout';

function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    fetch('/me')
      .then((res) => {
        if (res.ok) {
          res.json().then((user) => setCurrentUser(user));
        }
      });
  }, []);

  return (
    <div>
      {currentUser.name ? <NavBar setCurrentUser={setCurrentUser} /> : null}
      <Routes>
        <Route path="/" element={currentUser.name ? <Find /> : <Login setCurrentUser={setCurrentUser} />} />
        <Route path="/find" element={<Find />} />
        <Route path="/details/:id" element={<RestaurantDetails currentUser={currentUser} />} />
        <Route path="/create" element={<Create currentUser={currentUser} />} />
        <Route path="/my-favorites" element={<Favorites currentUser={currentUser} />} />
        <Route path="/my-profile" element={<Profile currentUser={currentUser} />} />
        <Route path="/logout" element={<Logout setCurrentUser={setCurrentUser} />} />
      </Routes>
    </div>
  );
}

export default App;
