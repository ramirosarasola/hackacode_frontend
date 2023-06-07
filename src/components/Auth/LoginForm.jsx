import React, { useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../slices/authSlice';
import '../../styles/components/Auth/LoginForm.css';
import { BrowserRouter , Navigate } from 'react-router-dom';


const LoginForm = () => {
  
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const {email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
      dispatch(loginUser({email, password}));
  };

  return (
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
  );
};

export default LoginForm;