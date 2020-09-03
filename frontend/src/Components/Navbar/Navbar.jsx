import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className={`nav nav__black`}>
      <img
        className="nav__logo"
        src="https://movielistnow.com/wp-content/uploads/2018/07/cropped-Cotidiano-3.png"
        alt="Movie List Logo"
      />
      <img
        className="nav__avatar"
        onClick={() => window.open("https://linkedin.com/in/murattishkul")}
        src="https://avatars0.githubusercontent.com/u/38204149?s=460&u=0b3af45921a81a71c83045aa4c1ad86d796d8a62&v=4"
        alt="Mura Logo"
      />
    </div>
  );
};

export default Navbar;
