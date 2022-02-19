import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="homeroute1">
        Home
      </Link>
      <Link to="/" className="homeroute2">
        Login
      </Link>
    </div>
  );
};
