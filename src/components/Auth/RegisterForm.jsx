import React, { useState } from "react";
import "../../styles/components/Auth/RegisterForm.css";
import { useDispatch, useSelector } from "react-redux";

const RegisterForm = () => {
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
  });

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const { name, lastname, email, password, password2 } = user;
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    const formData = new formData();
    e.preventDefault();
    
    if (password !== password2) {
      console.log("Passwords do not match");
    } else {
      const newUser = {
        name: formData.name,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
      };
      dispatch(registerUser(newUser));
      console.log(newUser);
    }
  };

  return (
    <form action="" className="register__form" onSubmit={(e) => onSubmit(e)}>
      <label htmlFor="">
        Name
      </label>
        <input
          required
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => onChange(e)}
        />
      <label htmlFor="">
        Lastname
      </label>
        <input
          required
          type="text"
          name="lastname"
          id="lastname"
          value={lastname}
          onChange={(e) => onChange(e)}
        />
      <label htmlFor="">
        Email
      </label>
        <input
          required
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => onChange(e)}
        />
      <label htmlFor="">
        Password
      </label>
        <input
          required
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => onChange(e)}
        />
      <label htmlFor="">
        Repeat Password
      </label>
        <input
          required
          type="password"
          name="password2"
          id="password2"
          value={password2}
          onChange={(e) => onChange(e)}
        />

      <button type="submit">Registarse</button>
    </form>
  );
};

export default RegisterForm;
