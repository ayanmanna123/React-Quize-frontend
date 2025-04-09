import React, { useEffect, useState } from "react";
import "./userprofile.css";
import { Link } from "react-router-dom";

const Userprofile = () => {
  const [user, setUser] = useState(null);
  const authToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("https://react-quize-backend.vercel.app/api/auth/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        });

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };

    fetchProfile();
  }, [authToken]);

  if (!user) return <p>Loading profile...</p>;

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
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
                <Link
                  className="nav-link "
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/profile">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="user-profile">
        <div className="user-card">
          <img
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
            alt="avatar"
            className="avatar"
          />
          <h2>{user.name}</h2>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
          <em>
  Joined on: {new Date(user.date).toISOString().split("T")[0]}
</em>

          </p>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </Link>
          </li>
        </div>
      </div>
    </>
  );
};

export default Userprofile;
