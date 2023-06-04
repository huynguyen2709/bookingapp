import { useContext } from 'react';
import './navbar.css';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleNavigateLoginPage = () => {
    navigate(`/login`);
  };

  const handleNavigateHomePage = () => {
    navigate(`/`);
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo" onClick={handleNavigateHomePage}>
          lamabooking
        </span>

        {user ? (
          user.username
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button onClick={handleNavigateLoginPage} className="navButton">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
