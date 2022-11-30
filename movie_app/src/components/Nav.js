import React from "react";
import "./Nav.css";
import { useEffect, useState } from "react";

const Nav = () => {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  });
  return (
    <nav className={`nav ${show && "nav_block"}`}>
      <img
        alt="Netflix logo"
        src="https://blog.kakaocdn.net/dn/bTExuA/btqCOzrzq9S/KSaEUBVed10piZ7nMd4U81/img.jpg"
        className="nav_logo"
        onClick={() => window.location.reload()}
      />
      <img
        alt="User logged"
        src="https://www.shutterstock.com/shutterstock/photos/2188380687/display_1500/stock-vector-avatar-icon-or-logo-isolated-sign-symbol-vector-illustration-high-quality-black-style-vector-2188380687.jpg"
        className="nav_avatar"
      />
    </nav>
  );
};

export default Nav;
