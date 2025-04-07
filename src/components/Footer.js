import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Follow us:</p>
        <div className="social-icons">
          <a href="https://www.instagram.com/ayan.manna.90834/?hl=en" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
          <a href="https://www.facebook.com/ayan.manna.90834" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook"></i></a>
          <a href="https://www.youtube.com/@ayanmanna1007" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-youtube"></i></a>
        </div>
        <p className="terms">
          By using this app, you agree to our <Link to="/termsandconditions" >Terms and Conditions</Link>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
