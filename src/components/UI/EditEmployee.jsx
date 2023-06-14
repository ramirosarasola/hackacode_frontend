import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployee, getEmployee } from "../../slices/employeeSlice";
import { updateUser } from "../../slices/userSlice";
import { useParams } from "react-router-dom";
import { Alert } from './alert';

const EditForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getEmployee({ id }));
  }, [dispatch, id]);

  const { employees } = useSelector((state) => state.employees);
  const {users} = useSelector(state => state.users)
  console.log(users);
  console.log(employees);

  const employee = employees.find(emp => emp._id == id);
  console.log(employee);
  const user = users.find(user => user._id == employee.user);
  console.log(user);
  // I create this variable to be able to pass it to the updateUser method. Otherwise I have some problems...
  const { _id } = user;
  console.log(_id)

  const [formData, setFormData] = useState({
    name: employee && employee.name,
    lastName: employee && employee.lastName,
    email: user && user.email,
    password: "",
    password2: "",
  });

  useEffect(() => {
    if (employee && user) {
      const { name, lastName } = employee;
      const { email } = user;
      setFormData({
        name,
        lastName,
        email,
        password: "",
        password2: "",
      });
    }
  }, [employee]);

  const { name, email, password, password2, lastName } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      Alert('error', 'Passwords do not match');
    } else {
      const updatedEmployee = {
        name,
        lastName
      };
      const updatedUser = {
        email,
        password
      }
      dispatch(updateEmployee({ id, employeeData: updatedEmployee }));
      // Missing method to updateUSer
      dispatch(updateUser({ _id , userData: updatedUser }));
      console.log(updatedEmployee);
      Alert('success', 'Employee updated!')
    }
  };

  return (
    <form action="" className="edit__form" onSubmit={onSubmit}>
      <div className="field-container">
        <label>Name</label>
        <input type="text" name="name" value={name} onChange={onChange} />
      </div>
      <div className="field-container">
        <label>Lastname</label>
        <input
          type="text"
          name="lastname"
          value={lastName}
          onChange={onChange}
        />
      </div>
      <div className="field-container">
        <label>Email</label>
        <input type="email" name="email" value={email} onChange={onChange} />
      </div>
      <div className="field-container">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
        />
      </div>
      <div className="field-container">
        <label>Confirm Password</label>
        <input
          type="password"
          name="password2"
          value={password2}
          onChange={onChange}
        />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditForm;
