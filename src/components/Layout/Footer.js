import React, { useState } from "react";
import classes from "./Footer.module.css";
import { FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";
import { useSelector } from "react-redux";

const Footer = () => {
  const theme = useSelector((state) => state.theme.theme);
  const [clickedIcon, setClickedIcon] = useState(null);

  const handleIconClick = (iconName, link) => {
    setClickedIcon(iconName);
    window.open(link);
  };

  return (
    <footer className={theme === "light" ? classes.footer : classes.darkFooter}>
      <ul>
        <li>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
            Youtube
          </a>
          <FaYoutube
            size={24}
            onClick={() => handleIconClick("youtube", "https://www.youtube.com/")}
            className={clickedIcon === "youtube" ? classes.clickedIcon : ""}
            style={{ cursor: "pointer" }}
          />
        </li>
        <li>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <FaInstagram
            size={24}
            onClick={() => handleIconClick("instagram", "https://www.instagram.com/")}
            className={clickedIcon === "instagram" ? classes.clickedIcon : ""}
            style={{ cursor: "pointer" }}
          />
        </li>
        <li>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            Twitter
            <FaTwitter
              size={24}
              onClick={() => handleIconClick("twitter", "https://twitter.com/")}
              className={clickedIcon === "twitter" ? classes.clickedIcon : ""}
              style={{ cursor: "pointer" }}
            />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;