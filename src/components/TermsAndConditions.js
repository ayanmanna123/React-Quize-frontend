import React from "react";
import "./TermsAndConditions.css";
import { Link } from "react-router-dom";
const TermsAndConditions = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                React Quiz App
              </a>
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
                    <Link
                      className="nav-link "
                      aria-current="page"
                      to="/home"
                    >
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
    <div className="terms-container">
      <h2>Terms and Conditions</h2>
      <p>Welcome to our Quiz App. By using our service, you agree to the following terms and conditions:</p>

      <ol>
        <li>
          <strong>Account Responsibility:</strong> You are responsible for maintaining the confidentiality of your account and password.
        </li>
        <li>
          <strong>Use of Content:</strong> All content including quizzes, reports, and analytics is for personal and educational use only.
        </li>
        <li>
          <strong>Accuracy of Information:</strong> While we strive to provide accurate content, we do not guarantee the correctness of the quiz data.
        </li>
        <li>
          <strong>Modification:</strong> We reserve the right to modify or terminate the service for any reason, without notice.
        </li>
        <li>
          <strong>Prohibited Use:</strong> You may not use the platform for any illegal or unauthorized purpose.
        </li>
        <li>
          <strong>Data Privacy:</strong> We do not share your personal information with third parties, except as required by law.
        </li>
        <li>
          <strong>Changes to Terms:</strong> We may update these terms from time to time. Continued use of the app implies acceptance of the new terms.
        </li>
      </ol>

      <p>By continuing to use our service, you confirm that you have read and agree to our terms and conditions.</p>
    </div>
    </>
  );
};

export default TermsAndConditions;
