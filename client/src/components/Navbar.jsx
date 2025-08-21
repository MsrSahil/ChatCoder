import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const Navbar = () => {
  const [selectedTheme, setSelectedTheme] = useState(
    sessionStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", selectedTheme);
    sessionStorage.setItem("theme", selectedTheme);
  }, [selectedTheme]);

  return (
    <>
      <div className="bg-primary text-primary-content flex justify-between items-center p-3">
        <h1 className="text-3xl font-bold"><Link to={"/"}>ChatApp</Link></h1>
        {/* <button className="btn btn-error">Testing</button> */}

        <div className="flex gap-4 items-center">
          <Link to={"/about"}>About</Link>
          <Link to={"/contact"}>Contact</Link>
          <Link to={"/services"}>Services</Link>
          <Link to={"/login"}>Login</Link>
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
            className="select select-bordered w-full border-secondary bg-base-100 text-base-content focus:ring-2 focus:ring-secondary"
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
