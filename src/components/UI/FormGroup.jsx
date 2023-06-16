import React from 'react';

function FormGroup({ label, type, name, placeholder, value, onChange, options, multiple = false }) {
  if (type === 'select') {
    return (
      <div className='field-container'>
        <label htmlFor="">{label}</label>
        <select name={name} value={value} onChange={onChange} multiple={multiple}>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className='field-container'>
      <label htmlFor="">{label}</label>
      <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
}

export default FormGroup;
