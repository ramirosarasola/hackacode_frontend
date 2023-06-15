import React, { useState } from 'react'
import FormGroup from '../UI/FormGroup'
import '../../styles/components/Auth/RegisterForm.css'

function GameForm() {

    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        password2: "",
      });
    
      const { name, email, password, password2, lastname } = formData;
    
      const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });


    const formFields = [
        {
          name: "name",
          type: "text",
          placeholder: "Name",
          label: "Name",
          value: formData.description
        },
        {
          name: "description",
          type: "text",
          placeholder: "Description",
          label: "Description",
          value: formData.description,
        },
        {
            name: "photo",
            type: "file",
            placeholder: "Game Photo",
            label: "Game Photo",
            value: formData.photo,
           },
        {
         name: "hours",
         type: "date",
         placeholder: "Hours",
         label: "Hours",
         value: formData.hours,
        },
        {
         name: "employees",
         type: "select",
         placeholder: "Employees",
         label: "Employees",
         value: formData.employees,
        },

      ]
    
  return (
    <div className='form_container'>
        {formFields.map((field) => (
            <FormGroup key={field.name} {...field} />
        ))}
    </div>
  )
}

export default GameForm