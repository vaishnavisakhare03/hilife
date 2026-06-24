import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-icon">H</span>
        <span className="logo-text">HiLife</span>
      </div>

      <div className="nav-links">
        <NavLink to="/events">Events</NavLink>
        <NavLink to="/tasks">Tasks</NavLink>
        <NavLink to="/feedbacks">Feedbacks</NavLink>
        <NavLink to="/committee">Committee</NavLink>
      </div>

      <div className="user-profile">
        <div className="user-info">
          <div className="user-profile">
            <div className="user-avatar">
              {currentUser?.firstName?.charAt(0)}
            </div>

            <div className="user-details">
              <span className="user-name">{currentUser?.firstName}</span>

              <span className="user-role">{currentUser?.role}</span>
            </div>
          </div>
        </div>

        {/* <div className="user-avatar">{currentUser?.firstName?.charAt(0)}</div> */}
      </div>
    </nav>
  );
}

export default Navbar;
