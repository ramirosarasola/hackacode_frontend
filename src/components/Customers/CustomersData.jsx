import React, { useEffect } from 'react';
import CustomerTableData from './CustomerDataTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers, deleteCustomer, updateCustomer } from '../../slices/customerSlice';
import '../../styles/pages/CustomerData.css';

const CustomersData = () => {
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.customers);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleDeleteCustomer = (index) => {
    const customerId = customers[index]._id;
    dispatch(deleteCustomer(customerId));
  };

  const handleUpdateCustomer = (index, updatedCustomer) => {
    console.log(index);
    const customer = customers[index];
    if (customer) {
      const customerData = { ...updatedCustomer }
      console.log(customerData);
      const id = customer._id;
      dispatch(updateCustomer({ id, customerData }));
    }
  };

  return (
    <div className='customer__data--container'>
      <h1>Customer Data</h1>
      <CustomerTableData
        customers={customers}
        onDeleteCustomer={handleDeleteCustomer}
        onUpdateCustomer={handleUpdateCustomer}
      />
    </div>
  );
};

export default CustomersData;
