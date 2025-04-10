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
    console.log(json);

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
    console.log(sendCodeJson);

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
    console.log(json);
    if (json.success) {
      alert("Email verified successfully!");
      setIsLogin(true);
      setShowVerify(false);
    } else {
      alert("Invalid or expired code.");
    }
  };

  return (
    <div className={`container ${isLogin ? "" : "active"}`}>
      {showVerify ? (
        <div className="form-box verify">
          <h1>Verify Your Email</h1>
          <p>Enter the 6-digit code sent to {credentials.email}</p>
          <input
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
          />
          <button className="btn" onClick={handleVerifyCode}>
            Verify
          </button>
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

      {/* Toggle section */}
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
