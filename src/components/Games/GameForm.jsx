import React, { useState, useEffect } from 'react'
import FormGroup from '../UI/FormGroup'
import '../../styles/components/Auth/RegisterForm.css'
import { useDispatch, useSelector } from 'react-redux';
import { createGame, editGame, getGames, uploadPhoto } from '../../slices/gameSlice';
import { fetchEmployees } from '../../slices/employeeSlice';
import { Alert } from '../../components/UI/alert';


function GameForm({ id }) {
  const { employees: employeesList } = useSelector((state) => state.employees);
  const { games: allGames } = useSelector((state) => state.games);
  const [editForm, setEditForm] = useState(false);
  const dispatch = useDispatch();

  const isEditingForm = () => {
    const currentPath = window.location.pathname;
    currentPath.includes('edit') ? setEditForm(true) : setEditForm(false);
  }

  useEffect(() => {
    isEditingForm()
  }, [])

  const editedGame = allGames.find((game) => game._id === id);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const gameData = {
        id,
        ...formData
      };
      console.log(gameData);
      await dispatch(editGame(gameData)).unwrap();
      await dispatch(uploadPhoto({ id: id, file: photo })).unwrap();
      Alert('success', 'Game updated successfully');
    } catch (error) {
      Alert('error', 'Something went wrong...');
      console.log(error);
    }
  }

  const [games, setGames] = useState([]);
  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(getGames())
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: editedGame?.name || "",
    description: editedGame?.description || "",
    price: editedGame?.price || "",
    employees: editedGame?.employees || [],
    hours: editedGame?.hours || [
      {
        opening: "",
        closing: ""
      }
    ],
    photo: editedGame?.photo || null
  });

  console.log(formData);

  const { name, description, hours, employees, photo, price } = formData;

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
      setFormData({ ...formData, photo: e.target.files[0] });
    } else if (e.target.name === 'price') {
      const value = e.target.value.replace(/[^0-9.]/g, '');
      setFormData({ ...formData, price: value });
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
        price,
        employees
      };

      const createdGame = await dispatch(createGame(gameData)).unwrap();
      setGames([...games, createdGame]);
      await dispatch(uploadPhoto({ id: createdGame._id, file: photo })).unwrap();
      setFormData({ name: "", description: "", employees: [], hours: [{ opening: "", closing: "" }], photo: null })
      if (createdGame.photo === 'no-photo.jpg') {
        Alert('warning', 'The game is missing an image');
      }
      Alert('success', 'Game created successfully');
    } catch (error) {
      Alert('error', 'Something goes wrong...')
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
      name: "price",
      type: "number",
      placeholder: "Price",
      label: "Price",
      value: price,
      step: "0.001",
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
      options: employeesList.filter(employee => employee.type === 'employee').map((employee) => ({
        value: employee._id,
        label: `${employee.name} ${employee.lastName}`,
      })),
      multiple: true,
      onChange: onChange
    },
  ]

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
      <form className='form_container' onSubmit={editForm ? handleEdit : onSubmit} encType='multipart/form-data'>
        {formFields.map((field) => (
          <FormGroup key={field.name} {...field} multiple={field.multiple} />
        ))}
        <button type="submit" className={`${editForm ? "hide" : "show"}`}>Register</button>
        <button type='submit' className={`${editForm ? "show" : "hide"}`}>Save Changes</button>
      </form>
    </div>
  )
}

export default GameForm