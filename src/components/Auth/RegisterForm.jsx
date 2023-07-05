import React, { useState } from "react";
import "../../styles/components/Auth/RegisterForm.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../slices/authSlice";
import FormGroup from "../UI/FormGroup";


const RegisterForm = () => {
  
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

  const formFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
      label: "Name",
      value: formData.name,
      onChange: onChange
    },
    {
      name: "lastname",
      type: "text",
      placeholder: "Last Name",
      label: "Last Name",
      value: formData.lastName,
      onChange: onChange
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      value: formData.email,
      onChange: onChange
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      value: formData.password,
      onChange: onChange
    },
    {
      name: "password2",
      type: "password",
      placeholder: "Confirm Password",
      label: "Confirm Password",
      value: formData.password2,
      onChange: onChange
    }
  ]

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
    }
  };

  return (
    <form action="" className="form_container" onSubmit={(e) => onSubmit(e)}>
      {formFields.map((field) => (
        <FormGroup key={field.name} {...field} />
      ))}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
