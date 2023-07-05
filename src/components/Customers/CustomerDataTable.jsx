import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import '../../styles/components/UI/Pagination.css'

const CustomerTableData = ({ customers, onDeleteCustomer, onUpdateCustomer, userRole, employeeType }) => {
  const [editedFields, setEditedFields] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = customers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(customers.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <table className='customers__data--table'>
        <thead className='data--table--head'>
          <tr>
            <th>Name</th>
            <th>Lastname</th>
            <th>DNI</th>
            <th>Email</th>
            {(userRole === 'admin' || employeeType === 'manager') && <th style={{ textAlign: 'center' }}>Actions</th>}
          </tr>
        </thead>
        <tbody className='data--table--body'>
          {currentItems.map((customer, index) => (
            <tr key={index}>
              <td onClick={() => handleDataClick(indexOfFirstItem + index, 'name', customer.name)}>
                {editedFields[`${indexOfFirstItem + index}-name`] !== undefined ? (
                  <input
                    type='text'
                    value={editedFields[`${indexOfFirstItem + index}-name`]}
                    onChange={(e) => handleInputChange(e, indexOfFirstItem + index, 'name')}
                    onBlur={() => handleInputBlur(indexOfFirstItem + index, 'name')}
                  />
                ) : (
                  customer.name
                )}
              </td>
              <td onClick={() => handleDataClick(indexOfFirstItem + index, 'lastName', customer.lastName)}>
                {editedFields[`${indexOfFirstItem + index}-lastName`] !== undefined ? (
                  <input
                    type='text'
                    value={editedFields[`${indexOfFirstItem + index}-lastName`]}
                    onChange={(e) => handleInputChange(e, indexOfFirstItem + index, 'lastName')}
                    onBlur={() => handleInputBlur(indexOfFirstItem + index, 'lastName')}
                  />
                ) : (
                  customer.lastName
                )}
              </td>
              <td onClick={() => handleDataClick(indexOfFirstItem + index, 'dni', customer.dni)}>
                {editedFields[`${indexOfFirstItem + index}-dni`] !== undefined ? (
                  <input
                     type='text'
                     value={editedFields[`${indexOfFirstItem + index}-dni`]}
                     onChange={(e) => handleInputChange(e, indexOfFirstItem + index, 'dni')}
                     onBlur={() => handleInputBlur(indexOfFirstItem + index, 'dni')}
                  />
                ) : (
                  customer.dni
                )}
              </td>
              <td onClick={() => handleDataClick(indexOfFirstItem + index, 'email', customer.email)}>
                {editedFields[`${indexOfFirstItem + index}-email`] !== undefined ? (
                  <input
                    type='text'
                    value={editedFields[`${indexOfFirstItem + index}-email`]}
                    onChange={(e) => handleInputChange(e, indexOfFirstItem + index, 'email')}
                    onBlur={() => handleInputBlur(indexOfFirstItem + index, 'email')}
                  />
                ) : (
                  customer.email
                )}
              </td>
              {(userRole === 'admin' || employeeType === 'manager') && (
                <td className='data--table--button' style={{ textAlign: 'center' }}>
                  {editedFields[`${indexOfFirstItem + index}-name`] !== undefined ? (
                    <button onClick={() => handleInputBlur(indexOfFirstItem + index, 'name')}>Save</button>
                  ) : (
                    <>
                      <button onClick={() => handleDataClick(indexOfFirstItem + index, 'name', customer.name)}>
                        <EditIcon />
                      </button>
                      <button onClick={() => handleDeleteClick(indexOfFirstItem + index)}>
                        <DeleteIcon />
                      </button>
                    </>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i + 1} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
              
export default CustomerTableData;
              