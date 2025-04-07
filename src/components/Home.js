import React from "react";

import Quize from "./Quize";
import Soure from "./Soure";
import TopScores from "./TopScores";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import logo from "./logo.png";
const Home = () => {
   

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center"  to="/home">
            <img
             src={logo} // <-- replace with your logo path
              alt="Logo"
              width="30"
              height="30"
              className="d-inline-block align-top me-2"
            />
            React Quiz App
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/home" >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="py-5">
        {/* Center the Quize component */}
        <div className="row justify-content-center mb-4">
          <div className="col-md-4 col-sm-10 my-5 ">
            <Quize />
          </div>
        </div>

        {/* Score Report */}
        <Soure />
        <TopScores />
      </div>
      <Footer />
    </>
  );
};

export default Home;
