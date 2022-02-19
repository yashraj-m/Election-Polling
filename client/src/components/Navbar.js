import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="homeroute">
        Home
      </Link>
    </div>
  );
};
