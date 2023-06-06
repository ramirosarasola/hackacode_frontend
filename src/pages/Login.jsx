import React from "react";
import LoginForm from '../components/Auth/LoginForm';
import '../styles/pages/Login.css';
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if(isAuthenticated){
    return <Navigate to="/"/>;
}

  return <div className="login">
    <h2>Inicia Sesion</h2>
    <LoginForm/>
  </div>;
};

export default Login;
