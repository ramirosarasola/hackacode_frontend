import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TicketsTableData = ({ tickets, onDeleteTicket, onUpdateTicket }) => {
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
    if (editedValue !== undefined && editedValue !== tickets[index][field]) {
      const updatedTicket = { ...tickets[index], [field]: editedValue };
      onUpdateTicket(index, updatedTicket);
    }
    setEditedFields({ ...editedFields, [`${index}-${field}`]: undefined });
  };

  const handleDeleteClick = (index) => {
    onDeleteTicket(index);
  };

  return (
    <table className='tickets__data--table'>
      <thead className='data--table--head'>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Game</th>
          <th style={{ textAlign: 'center' }}>Actions</th>
        </tr>
      </thead>
      <tbody className='data--table--body'>
        {tickets.map((ticket, index) => (
          <tr key={index}>
            <td>{ticket._id}</td>
            <td>{ticket.customer}</td>
            <td>{ticket.game}</td>
            <td className='data--table--button' style={{ textAlign: 'center' }}>
              {Object.keys(editedFields).some((key) => key.startsWith(`${index}-`)) ? (
                <button onClick={() => handleInputBlur(index, 'customer')}>Save</button>
              ) : (
                <>
                  <button onClick={() => handleDataClick(index, 'customer', ticket.customer)}>
                    <EditIcon />
                  </button>
                  <button onClick={() => handleDeleteClick(index)}>
                    <DeleteIcon />
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TicketsTableData;
