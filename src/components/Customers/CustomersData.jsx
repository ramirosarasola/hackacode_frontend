import React, { useEffect } from 'react';
import CustomerTableData from './CustomerDataTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers, deleteCustomer, updateCustomer } from '../../slices/customerSlice';
import '../../styles/pages/CustomerData.css';

const CustomersData = () => {
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.customers);
  const { user } = useSelector((state) => state.auth);
  const { employees } = useSelector((state) => state.employees);
  console.log(employees);
  console.log(user);

  const employeeType = employees.find(
    (employee) => employee.user === user.data?._id
  )?.type;

  const userRole = user.data?.role;
  console.log(employeeType);
  console.log(userRole);

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
        userRole={userRole}
        employeeType={employeeType}
      />
    </div>
  );
};

export default CustomersData;
