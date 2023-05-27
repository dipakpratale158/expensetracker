import React from "react";
import classes from "./Footer.module.css";
import instagramIcon from "../../assets/instagram.png";
import twitterIcon from "../../assets/twitter.png";
import youtubeIcon from "../../assets/youtube.png";
import { useSelector } from "react-redux";

const Footer = () => {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <footer className={theme === "light" ? classes.footer : classes.darkFooter}>
      <ul>
        <li>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="youtube"
          >
            Youtube
         
          <img src={youtubeIcon} alt="Youtube" />
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="instagram"
          >
            Instagram
          
          <img src={instagramIcon} alt="Instagram" />
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="twitter"
          >
            Twitter
            <img src={twitterIcon} alt="twitter" />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;