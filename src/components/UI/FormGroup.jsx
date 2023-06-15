import React from 'react'

function FormGroup({label, type, name,placeholder, value, onChange}) {
  return (
    <div className='field-container'>
        <label htmlFor="">{label}</label>
        <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  )
}

export default FormGroup