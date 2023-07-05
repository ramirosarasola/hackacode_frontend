import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import '../../styles/components/Customers/CustomerDataTable.css';

const SalesTableData = ({ sales, onDeleteSale, onUpdateSale }) => {
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
    if (editedValue !== undefined && editedValue !== sales[index].tickets[field]) {
      const updatedSale = {
        ...sales[index],
        tickets: { ...sales[index].tickets, [field]: editedValue },
      };
      onUpdateSale(index, updatedSale);
    }
    setEditedFields({ ...editedFields, [`${index}-${field}`]: undefined });
  };

  const handleDeleteClick = (index) => {
    onDeleteSale(index);
  };

  return (
    <table className='sales__data--table'>
      <thead className='data--table--head'>
        <tr>
          <th>ID</th>
          <th>Amount of Tickets</th>
          <th>Total</th>
          <th style={{ textAlign: 'center' }}>Actions</th>
        </tr>
      </thead>
      <tbody className='data--table--body'>
        {sales.map((sale, index) => (
          <tr key={index}>
            <td>{sale._id}</td>
            {/* <td>{Object.values(sale.tickets).reduce((acc, curr) => acc + curr, 0)}</td> */}
            <td>{sale.tickets.length}</td>
            <td>
              {editedFields[`${index}-total`] !== undefined ? (
                <input
                  type='number'
                  value={editedFields[`${index}-total`]}
                  onChange={(e) => handleInputChange(e, index, 'total')}
                  onBlur={() => handleInputBlur(index, 'total')}
                />
              ) : (
                sale.total
              )}
            </td>
            <td className='data--table--button' style={{ textAlign: 'center' }}>
              {Object.keys(editedFields).some((key) => key.startsWith(`${index}-`)) ? (
                <button onClick={() => handleInputBlur(index, 'name')}>Save</button>
              ) : (
                <>
                  <button onClick={() => handleDataClick(index, 'name', sale.name)}>
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

export default SalesTableData;
