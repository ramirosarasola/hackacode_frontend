import React, { useState, useEffect } from 'react'
import FormGroup from '../UI/FormGroup'
import '../../styles/components/Auth/RegisterForm.css'
import { useDispatch, useSelector } from 'react-redux';
import { createGame, uploadPhoto } from '../../slices/gameSlice';
import { fetchEmployees } from '../../slices/employeeSlice';


function GameForm() {

  const { employees: employeesList } = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const [games, setGames] = useState([]);
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        employees: [],
        hours: [
          {
            opening: "",
            closing: ""
          }
        ],
        photo:null
      });
    
      const { name, description,  hours, employees, photo } = formData;
    
      const onChange = (e) => {
        if (e.target.name === 'opening' || e.target.name === 'closing') {
          setFormData({
            ...formData,
            hours: [
              {
                ...hours[0],
                [e.target.name]: e.target.value,
              },
            ],
          });
        } else if (e.target.name === 'employees') {
          const selectedOptions = Array.from(e.target.options)
            .filter((option) => option.selected)
            .map((option) => option.value);
          setFormData({ ...formData, [e.target.name]: selectedOptions });
        } else if (e.target.name === 'photo') {
          setFormData({ ...formData, photo: e.target.files[0] }); // Update this line
        } else {
          setFormData({ ...formData, [e.target.name]: e.target.value });
        }
      };
      

      const onSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted', formData)
        try {
          const gameData = {
            name,
            description,
            hours,
            employees
          };
      
          const createdGame = await dispatch(createGame(gameData)).unwrap();
          setGames([...games, createdGame]);
          await dispatch(uploadPhoto({ id: createdGame._id, file: photo })).unwrap();
          setFormData({name: "", description: "", employees: [], hours:[{opening: "", closing: ""}] ,photo:null})
        } catch (error) {
          console.log(error);
        }
      };
      
      

    const formFields = [
        {
          name: "name",
          type: "text",
          placeholder: "Name",
          label: "Name",
          value: name,
          onChange: onChange
        },
        {
          name: "description",
          type: "text",
          placeholder: "Description",
          label: "Description",
          value: description,
          onChange: onChange
        },
        {
            name: "photo",
            type: "file",
            placeholder: "Game Photo",
            label: "Game Photo",
            onChange: onChange
        },
        {
         name: "opening",
         type: "datetime-local",
         placeholder: "Opening Hour",
         label: "Opening Hour",
         value: hours[0].opening,
         onChange: onChange
        },
        {
          name: "closing",
          type: "datetime-local",
          placeholder: "Closing Hour",
          label: "Closing Hour",
          value: hours[0].closing,
          onChange: onChange
         },
         {
          name: "employees",
          type: "select",
          placeholder: "Employees",
          label: "Employees",
          value: employees,
          options: employeesList.filter(employee => employee.type === 'manager').map((employee) => ({
            value: employee._id,
            label: `${employee.name} ${employee.lastName}`,
          })),
          multiple: true,
          onChange: onChange
        },
      ]
      
      /* console.log(formData) */
      
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%'}}>
      <form className='form_container' onSubmit={onSubmit} encType='multipart/form-data'>
        {formFields.map((field) => (
          <FormGroup key={field.name} {...field} multiple={field.multiple} />
        ))}
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default GameForm