import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import '../../styles/pages/CustomerData.css';

const CustomerTableData = ({ customers, onDeleteCustomer, onUpdateCustomer, userRole, employeeType }) => {
  const [editedFields, setEditedFields] = useState({});

  const handleDataClick = (index, field, value) => {
    setEditedFields({ ...editedFields, [`${index}-${field}`]: value });
  };

  const handleInputChange = (event, index, field) => {
    const { value } = event.target;
    setEditedFields({ ...editedFields, [`${index}-${field}`]: value });
  };

  const handleInputBlur = (index, field) => {
    const editedValue = editedFields[`${index}-${field}`];
    if (editedValue !== undefined && editedValue !== customers[index][field]) {
      const updatedCustomer = { ...customers[index], [field]: editedValue };
      onUpdateCustomer(index, updatedCustomer);
    }
    setEditedFields({ ...editedFields, [`${index}-${field}`]: undefined });
  };

  const handleDeleteClick = (index) => {
    onDeleteCustomer(index);
  };

  return (
    <table className='customers__data--table'>
      <thead className='data--table--head'>
        <tr>
          <th>Name</th>
          <th>Lastname</th>
          <th>DNI</th>
          <th>Email</th>
          {
            (userRole === "admin" || employeeType === "manager")
            &&
            <th style={{ textAlign: 'center' }}>Actions</th>}
        </tr>
      </thead>
      <tbody className='data--table--body'>
        {customers.map((customer, index) => (
          <tr key={index}>
            <td onClick={() => handleDataClick(index, 'name', customer.name)}>
              {editedFields[`${index}-name`] !== undefined ? (
                <input
                  type='text'
                  value={editedFields[`${index}-name`]}
                  onChange={(e) => handleInputChange(e, index, 'name')}
                  onBlur={() => handleInputBlur(index, 'name')}
                />
              ) : (
                customer.name
              )}
            </td>
            <td onClick={() => handleDataClick(index, 'lastName', customer.lastName)}>
              {editedFields[`${index}-lastName`] !== undefined ? (
                <input
                  type='text'
                  value={editedFields[`${index}-lastName`]}
                  onChange={(e) => handleInputChange(e, index, 'lastName')}
                  onBlur={() => handleInputBlur(index, 'lastName')}
                />
              ) : (
                customer.lastName
              )}
            </td>
            <td onClick={() => handleDataClick(index, 'dni', customer.dni)}>
              {editedFields[`${index}-dni`] !== undefined ? (
                <input
                  type='text'
                  value={editedFields[`${index}-dni`]}
                  onChange={(e) => handleInputChange(e, index, 'dni')}
                  onBlur={() => handleInputBlur(index, 'dni')}
                />
              ) : (
                customer.dni
              )}
            </td>
            <td onClick={() => handleDataClick(index, 'email', customer.email)}>
              {editedFields[`${index}-email`] !== undefined ? (
                <input
                  type='text'
                  value={editedFields[`${index}-email`]}
                  onChange={(e) => handleInputChange(e, index, 'email')}
                  onBlur={() => handleInputBlur(index, 'email')}
                />
              ) : (
                customer.email
              )}
            </td>
            {
              (userRole === "admin" || employeeType === "manager")
              &&
              <td className='data--table--button' style={{ textAlign: 'center' }}>
              {editedFields[`${index}-name`] !== undefined ? (
                <button onClick={() => handleInputBlur(index, 'name')}>Save</button>
              ) : (
                  
                  <>
                  <button onClick={() => handleDataClick(index, 'name', customer.name)}>
                    <EditIcon />
                  </button>
                  <button onClick={() => handleDeleteClick(index)}>
                    <DeleteIcon />
                  </button>
                  </>
              )}
            </td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerTableData;
