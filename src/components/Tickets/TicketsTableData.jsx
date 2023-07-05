import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import '../../styles/components/UI/Pagination.css'
import '../../styles/components/Customers/CustomerDataTable.css'

const TicketsTableData = ({ tickets, onDeleteTicket, onUpdateTicket, userRole, employeeType }) => {
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
    if (editedValue !== undefined && editedValue !== tickets[index][field]) {
      const updatedTicket = { ...tickets[index], [field]: editedValue };
      onUpdateTicket(index, updatedTicket);
    }
    setEditedFields({ ...editedFields, [`${index}-${field}`]: undefined });
  };

  const handleDeleteClick = (index) => {
    onDeleteTicket(index);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tickets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(tickets.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <table className='tickets__data--table' >
        <thead className='data--table--head'>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Game</th>
            {(userRole === 'admin' || employeeType === 'employee') && (
              <th style={{ textAlign: 'center' }}>Actions</th>
            )}
          </tr>
        </thead>
        <tbody className='data--table--body'>
          {currentItems.map((ticket, index) => (
            <tr key={index}>
              <td>{ticket._id}</td>
              <td onClick={() => handleDataClick(indexOfFirstItem + index, 'customer', ticket.customer)}>
                {editedFields[`${indexOfFirstItem + index}-customer`] !== undefined ? (
                  <input
                    type='text'
                    value={editedFields[`${indexOfFirstItem + index}-customer`]}
                    onChange={(e) => handleInputChange(e, indexOfFirstItem + index, 'customer')}
                    onBlur={() => handleInputBlur(indexOfFirstItem + index, 'customer')}
                  />
                ) : (
                  ticket.customer
                )}
              </td>
              <td>{ticket.game}</td>
              {(userRole === 'admin' || employeeType === 'employee') && (
                <td className='data--table--button' style={{ textAlign: 'center' }}>
                  {editedFields[`${indexOfFirstItem + index}-customer`] !== undefined ? (
                    <button onClick={() => handleInputBlur(indexOfFirstItem + index, 'customer')}>Save</button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleDataClick(indexOfFirstItem + index, 'customer', ticket.customer)}
                      >
                        <EditIcon/>
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
          <button
            key={i + 1}
            className={currentPage === i + 1 ? 'active' : ''}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TicketsTableData;
