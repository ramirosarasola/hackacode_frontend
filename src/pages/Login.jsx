import React, { useState } from "react";
import LoginForm from "../components/Auth/LoginForm";
import { loginUser } from "../slices/authSlice";
import "../styles/pages/Login.css";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../components/UI/Footer";

const Login = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="">
      <div className="bg-image"></div>
      <div className="content">
        <div className="login">
          <h2>
            Sign <span>In</span>
          </h2>
          <form action="" className="login__form" onSubmit={(e) => onSubmit(e)}>
            <div className="field-container">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="field-container">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
              />
            </div>

            <button type="submit">Log In</button>
          </form>
        </div>
        ;
      </div>
      <Footer />
    </div>
  );
};

export default Login;
