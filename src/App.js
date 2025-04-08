import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin
      ? `${import.meta.env.VITE_PUBLIC_HOST}/api/auth/login`
      : `${import.meta.env.VITE_PUBLIC_HOST}/api/auth/createuser`;
       

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
       
      navigate('/home');
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className={`container ${isLogin ? "" : "active"}`}>
      {isLogin ? (
        <div className="form-box login">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input-box">
               
              <div className="input-wrapper">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Email address"
                  value={credentials.email}
                  onChange={onChange}
                  required
                />
                <i className="fa-solid fa-user"></i>
                <i className="fa-solid fa-user"></i>
              </div>
            </div>
            <div className="input-box">
              
              <input
                type="password"
                className="form-control"
                id="password"
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
                className="form-control"
                id="name"
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
                className="form-control"
                id="email"
                name="email"
                placeholder="Emmail address"
                value={credentials.email}
                onChange={onChange}
                required
              />
              <i className="fa-solid fa-envelope"></i>
            </div>
            <div className="input-box">
            
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={onChange}
                minLength={5}
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
            <button className="btn login-btn" onClick={() => setIsLogin(true)}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
