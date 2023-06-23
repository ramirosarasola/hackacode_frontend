import React, { useState, useEffect } from "react";
import "../../styles/components/Sales/SalesForm.css";
import { useDispatch, useSelector } from "react-redux";
import { assignSale } from "../../slices/salesSlice";
import { fetchCustomers } from "../../slices/customerSlice";

const SalesForm = () => {
  const { customers } = useSelector((state) => state.customers);
  console.log(customers);
  const dispatch = useDispatch();
  const initialState = {
    customerId: "",
    ticketAmount: "",
    expenditure: "",
    paymentMethod: "",
  };
  const [formData, setFormData] = useState(initialState);

  const { customerId, ticketAmount, expenditure, paymentMethod } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newSale = {
      customerId: formData.customerId,
      ticketAmount: formData.ticketAmount,
      expenditure: formData.expenditure,
      paymentMethod: formData.paymentMethod,
    };
    dispatch(assignSale(newSale));
    setFormData(initialState);
    // console.log(formData);
    // console.log(newSale);
  };

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  return (
    <form className="sales__form" onSubmit={onSubmit}>
      <h2>Register Sale</h2>
      <div className="sales__form__container">
        <fieldset className="sales__customer--info">
          <legend>Customer Information</legend>
          <label>Customer</label>
          <select name="customerId" value={customerId} onChange={onChange}>
            <option value="">Select a customer</option>
            {/* Iterate over customers and create an option for each */}
            {customers.map((customer, i) => (
              <option key={i} value={customer.id}>
                {customer.name} {customer.lastName}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset className="sales__sales--info">
          <legend>Sale Data</legend>
          <label>Amount of tickets</label>
          <input
            type="number"
            name="ticketAmount"
            value={ticketAmount}
            onChange={onChange}
          />
          <label>Expenditure</label>
          <input
            type="number"
            name="expenditure"
            value={expenditure}
            onChange={onChange}
          />
          <label>Payment Method</label>
          <select
            name="paymentMethod"
            value={paymentMethod}
            onChange={onChange}
          >
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

export default SalesForm;
