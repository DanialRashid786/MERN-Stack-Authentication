// src/components/Header.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // Check if user is logged in when component mounts
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setIsLoggedIn(!!user); // Set to true if user is present in localStorage
    if (user) {
      setUsername(user);
    }
  }, []);

  // Handle logout by clearing localStorage and updating state
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token"); // Remove user data from localStorage

    setTimeout(() => {
      setIsLoggedIn(false);
      navigate("/login");
    }, 500); // Optional delay to show logout message or effect
  };

  // Render Login/Logout button based on state
  const renderAuthButton = () => {
    return isLoggedIn ? (
      <button className="btn" onClick={handleLogout}>
        Logout
      </button>
    ) : (
      <Link to="/login" className="btn">
        Login
      </Link>
    );
  };

  return (
    <>
      <header>
        <div className="navbar" data-theme="dark">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>{renderAuthButton()}</li>
              </ul>
            </div>
            {/* Navbar Brand or Logo */}
            <Link to="/" className="btn btn-ghost text-xl">
              daisyUI
            </Link>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>

          <div className="navbar-end">
            {/* Show username if logged in */}
            {isLoggedIn && <p className="mr-4">Welcome, {username}!</p>}
            {renderAuthButton()}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
