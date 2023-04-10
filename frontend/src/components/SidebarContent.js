import React, { useState } from "react";
import "./Style/SidebarContent.css";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

const SidebarContent = ({ children, profilePic, name }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [cookies, setCookie] = useCookies();
  const logout = async () => {
    cookies.remove("auth");
    window.location.href = "/";
    return false;
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="sidebar-content">
      <div className="sidebar-menu">
        <ul>
          <li>
            <Link to="/admin/dashboard">
              <a>Dashboard</a>
            </Link>
          </li>
          <li>
            <Link to="/admin/dealerlist">
              <a>Dealer List</a>
            </Link>
          </li>
          <li>
            <Link to="/admin/register">
              <a>Register Dealer</a>
            </Link>
          </li>
          <li>
            <Link to="/admin/registerproduct">
              <a>Add Product</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="main-content">
        <div className="user-info">
          <button onClick={toggleDropdown}>
            <img src={profilePic} alt="Profile pic" />
            <span>{name}</span>
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              <ul>
                <li>
                  <button>Profile</button>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default SidebarContent;
