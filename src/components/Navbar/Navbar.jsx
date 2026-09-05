import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { changePassword } from "../../api/userApi";
import { isLoggedIn } from "../../utils/auth";
import { getCurrentUser } from "../../utils/auth";
import "./Navbar.css";

function Navbar() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [showMenu, setShowMenu] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setShowMenu(false);

    navigate("/login");
  };

  const user = getCurrentUser();
  const handleChangePassword = async () => {
    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      await changePassword(user.id, {
        currentPassword: passwordData.currentPassword,

        newPassword: passwordData.newPassword,
      });

      alert("Password updated successfully");

      setShowPasswordDialog(false);

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Unable to change password");
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-icon">H</span>
        <span className="logo-text">HiLife</span>
      </div>

      <div className="nav-links">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/events">Events</NavLink>
        <NavLink to="/tasks">Tasks</NavLink>
        <NavLink to="/feedbacks">Feedbacks</NavLink>
        <NavLink to="/committee">Committee</NavLink>
      </div>

      <div className="user-menu">
        <div className="user-profile" onClick={() => setShowMenu(!showMenu)}>
          <div className="user-avatar">{currentUser?.firstName?.charAt(0)}</div>

          <div className="user-details">
            <span className="user-name">{currentUser?.firstName}</span>

            <span className="user-role">{currentUser?.role}</span>
          </div>
        </div>

        {showMenu && (
          <div className="profile-dropdown">
            <button
              onClick={() => {
                navigate("/profile");
                setShowMenu(false);
              }}
            >
              My Profile
            </button>

            {user && (
              <button
                className="change-password-btn"
                onClick={() => {
                  setShowPasswordDialog(true);
                  setShowMenu(false);
                }}
              >
                Change Password
              </button>
            )}
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

      {showPasswordDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h2>Change Password</h2>

            <input
              type="password"
              placeholder="Current Password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirmPassword: e.target.value,
                })
              }
            />

            <div className="dialog-buttons">
              <button className="upload-btn" onClick={handleChangePassword}>
                Update Password
              </button>

              <button
                className="cancel-btn"
                onClick={() => setShowPasswordDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
