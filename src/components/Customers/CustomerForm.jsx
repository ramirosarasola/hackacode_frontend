import React, { useState } from "react";
import "../../styles/components/Customers/CustomerForm.css";
import { useDispatch } from "react-redux";
import { registerCustomer } from "../../slices/customerSlice";

const CustomerForm = () => {
  const dispatch = useDispatch();
  const initialState = {
    name: "",
    lastName: "",
    age: "",
    dni: "",
    email: "",
    ticketAmount: "",
    expenditure: "",
    paymentMethod: ""
  }
  const [formData, setFormData] = useState(initialState);

  const { name, lastName, age, dni, email, ticketAmount, expenditure, paymentMethod } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      name: formData.name,
      lastName: formData.lastName,
      dni: formData.dni,
      email: formData.email,
    }
    dispatch(registerCustomer(newCustomer));
    setFormData(initialState);
    // console.log(formData);
    // console.log(newCustomer);
  };

  return (
    <form className="customers__form" onSubmit={onSubmit}>
      <h2>Register Customer</h2>
      <div className="customers__form__container">
        <fieldset className="customers__personal--info">
          <legend>Personal Information</legend>
          <label>Name</label>
          <input type="text" name="name" value={name} onChange={onChange} />
          <label>Lastname</label>
          <input type="text" name="lastName" value={lastName} onChange={onChange} />
          <label>Age</label>
          <input type="number" name="age" value={age} onChange={onChange} />
          <label>DNI</label>
          <input type="number" name="dni" value={dni} onChange={onChange} />
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </fieldset>
        <fieldset className="customers__sales--info">
          <legend>Customer Data</legend>
          <label>Amount of tickets</label>
          <input type="number" name="ticketAmount" value={ticketAmount} onChange={onChange} />
          <label>Expenditure</label>
          <input type="number" name="expenditure" value={expenditure} onChange={onChange} />
          <label>Payment Method</label>
          <select name="paymentMethod" value={paymentMethod} onChange={onChange}>
            <option value="">Mercado Pago</option>
            <option value="">Paypal</option>
            <option value="">Cash</option>
          </select>
        </fieldset>
      </div>

      <button type="submit">Send</button>
    </form>
  );
};

export default CustomerForm;
