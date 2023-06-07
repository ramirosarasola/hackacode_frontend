import React, { useState } from "react";
import "../../styles/components/Auth/RegisterForm.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../slices/authSlice";

const RegisterForm = () => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2, lastname } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("Passwords do not match");
    } else {
      const newUser = {
        name: formData.name,
        lastName: formData.lastname,
        email: formData.email,
        password: formData.password
      };
      dispatch(registerUser(newUser));
      console.log(newUser);
    }
  };

  return (
    <form action="" className="register__form" onSubmit={(e) => onSubmit(e)}>
      <div className="field-container">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
        />
      </div>
      <div className="field-container">
        <label>Lastname</label>
        <input
          type="text"
          name="lastname"
          value={lastname}
          onChange={(e) => onChange(e)}
        />
      </div>
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
          id=""
          value={password}
          onChange={(e) => onChange(e)}
        />
      </div>
      <div className="field-container">
        <label>Confirm Password</label>
        <input
          type="password"
          name="password2"
          value={password2}
          onChange={(e) => onChange(e)}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
