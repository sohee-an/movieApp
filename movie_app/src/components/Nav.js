import React from "react";
import "./Nav.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  });

  /* 검색한 영화로 이동 */
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  return (
    <nav className={`nav ${show && "nav_block"}`}>
      <img
        alt="Netflix logo"
        src="https://blog.kakaocdn.net/dn/bTExuA/btqCOzrzq9S/KSaEUBVed10piZ7nMd4U81/img.jpg"
        className="nav_logo"
        onClick={() =>
          // window.location.reload("/")
          navigate("/")
        }
      />
      <input
        value={searchValue}
        onChange={handleChange}
        className="nav__input"
        type="text"
        placeholder="영화를 검색해주세요"
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
