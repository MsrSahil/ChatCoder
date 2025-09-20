import React, { useState, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isLogin } = useAuth();
  const [selectedTheme, setSelectedTheme] = useState(
    sessionStorage.getItem("theme") || "spotify"
  );

  const location = useLocation().pathname.slice(1);
  console.log(location);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", selectedTheme);
    sessionStorage.setItem("theme", selectedTheme);
  }, [selectedTheme]);

  useEffect(() => {
    if (location === "chat") {
      window.scrollTo({ top: 64, behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      <div
        className={`${
          location !== "chat" ? "sticky top-0 z-50" : ""
        } bg-primary text-primary-content flex justify-between items-center px-8 py-3  transition-all duration-300`}
      >
        <h1 className="text-3xl font-bold">ChatApp</h1>

        <div className="flex gap-4 items-center">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/services">Services</Link>

          {isLogin && user ? (
            <>
              <Link to="/chat">Chat</Link>
              <Link to="/dashboard">
                <div className="flex gap-3 items-center me-5">
                  <img
                    src={user.photo}
                    alt=""
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span>{user.fullName.split(" ")[0]}</span>
                </div>
              </Link>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}

          <select
            name="theme"
            value={selectedTheme}
            onChange={(e) => {
              setSelectedTheme(e.target.value);
              document.documentElement.setAttribute(
                "data-theme",
                e.target.value
              );
              sessionStorage.setItem("theme", e.target.value);
            }}
            className="select select-bordered w-1/3 border-secondary bg-base-100 text-base-content focus:ring focus:ring-secondary"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="claude">Claude</option>
            <option value="corporate">Corporate</option>
            <option value="ghibli">Ghibli</option>
            <option value="gourmet">Gourmet</option>
            <option value="luxury">Luxury</option>
            <option value="pastel">Pastel</option>
            <option value="slack">Slack</option>
            <option value="soft">Soft</option>
            <option value="spotify">Spotify</option>
            <option value="valorant">Valorant</option>
            <option value="vscode">VS Code</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Navbar;