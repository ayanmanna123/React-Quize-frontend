import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showVerify, setShowVerify] = useState(false);
  const [code, setCode] = useState("");
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const endpoint = isLogin
      ? "https://react-quize-backend.vercel.app/api/auth/login"
      : "https://react-quize-backend.vercel.app/api/auth/createuser";
  
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
  
    const json = await response.json();
  
    // Login
    if (isLogin) {
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        navigate("/home");
        alert("Login successful!");
      } else {
        alert("Invalid login credentials.");
      }
      return;
    }
  
    // Signup
    if (!json.success) {
      if (json.error === "User with this email already exists") {
        alert("User already exists. Please log in instead.");
      } else {
        alert("Signup failed. Please try again.");
      }
      return;
    }
  
    // Send verification code after signup
    const sendCodeRes = await fetch(
      "https://react-quize-backend.vercel.app/api/auth/send-verification-code",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: credentials.email }),
      }
    );
  
    const sendCodeJson = await sendCodeRes.json();
  
    if (sendCodeJson.success) {
      setShowVerify(true);
      
    } else {
      alert("Failed to send verification code. Please try again.");
    }
  };
  

  const handleVerifyCode = async () => {
    const res = await fetch(
      "https://react-quize-backend.vercel.app/api/auth/verify-code",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: credentials.email, code }),
      }
    );

    const json = await res.json();
    
    if (json.success) {
      
      setIsLogin(true);
      setShowVerify(false);

      // ✅ Redirect after successful verification
      navigate("/home"); // change to "/quiz" or "/dashboard" if you want
    } else {
      alert("Invalid or expired code.");
    }
  };

  return (
    <div className={`container ${isLogin ? "" : "active"}`}>
      {showVerify ? (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
          <h3 className="text-center mb-3">Verify Your Email</h3>
          <p className="text-center text-muted mb-4">
            Enter the 6-digit code sent to <br />
            <strong>{credentials.email}</strong>
          </p>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
            />
          </div>
          <div className="d-grid">
            <button className="btn btn-primary" onClick={handleVerifyCode}>
              Verify
            </button>
          </div>
        </div>
      </div>
      
      
      ) : isLogin ? (
        <div className="form-box login">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={credentials.email}
                onChange={onChange}
                required
              />
              <i className="fa-solid fa-user"></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={onChange}
                required
              />
              <i className="fa-solid fa-lock"></i>
            </div>
            <button type="submit" className="btn">
              Login
            </button>
          </form>
        </div>
      ) : (
        <div className="form-box register">
          <form onSubmit={handleSubmit}>
            <h1>Signup</h1>
            <div className="input-box">
              <input
                type="text"
                name="name"
                placeholder="User Name"
                value={credentials.name}
                onChange={onChange}
                required
              />
              <i className="fa-solid fa-user"></i>
            </div>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={credentials.email}
                onChange={onChange}
                required
              />
              <i className="fa-solid fa-envelope"></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={onChange}
                required
              />
              <i className="fa-solid fa-lock"></i>
            </div>
            <button type="submit" className="btn">
              Signup
            </button>
          </form>
        </div>
      )}

      {!showVerify && (
        <div className="toggle-box">
          {isLogin ? (
            <div className="toggle-panel toggle-left">
              <h1>Hello, Welcome!</h1>
              <p>Don't have an account?</p>
              <button
                className="btn register-btn"
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </div>
          ) : (
            <div className="toggle-panel toggle-right">
              <h1>Welcome Back!</h1>
              <p>Already have an account?</p>
              <button
                className="btn login-btn"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
