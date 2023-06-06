import React from "react";
import "../styles/pages/Register.css";
import RegisterForm from "../components/Auth/RegisterForm";

const Register = () => {
  return (
    <div className="register__page">
      <div className="register__page--desc">
        <h2>Register New Employee</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem delectus temporibus repellendus dolorem illum eos voluptatibus veniam nisi! Autem fugiat </p>
      </div>
      <RegisterForm/>
    </div>
  );
};

export default Register;
