import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployee, getEmployee } from "../../slices/employeeSlice";
import { updateUser } from "../../slices/userSlice";
import { useParams } from "react-router-dom";
import { Alert, ConfirmAlert } from "../UI/alert";
import FormGroup from "../UI/FormGroup";
import "../../styles/components/Auth/RegisterForm.css";

const EditForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getEmployee({ id }));
  }, [dispatch, id]);

  const { employees } = useSelector((state) => state.employees);
  const { users } = useSelector((state) => state.users);

  const employee = employees.find((emp) => emp._id == id);

  const user = users.find((user) => user._id == employee.user);

  // I create this variable to be able to pass it to the updateUser method. Otherwise I have some problems...
  const { _id } = user;

  const [formData, setFormData] = useState({
    name: employee && employee.name,
    lastName: employee && employee.lastName,
    email: user && user.email,
    password: "",
    password2: "",
  });

  const { name, email, password, password2, lastName } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const formFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
      label: "Name",
      value: formData.name,
      onChange: onChange,
    },
    {
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      label: "Last Name",
      value: formData.lastName,
      onChange: onChange,
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      value: formData.email,
      onChange: onChange,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      value: formData.password,
      onChange: onChange,
    },
    {
      name: "password2",
      type: "password",
      placeholder: "Confirm Password",
      label: "Confirm Password",
      value: formData.password2,
      onChange: onChange,
    },
  ];

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

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      Alert("error", "Passwords do not match");
    } else {
      const updatedEmployee = {
        name,
        lastName,
      };
      const updatedUser = {
        email,
        password,
      };
      console.log(updatedEmployee);
      console.log(updateUser);
      // Alert("success", "Employee updated!");

      ConfirmAlert('Are you sure?',`Final results: Name: ${name} \n Lastname: ${lastName} \n Email: ${email}`, 'Yes, update it', 'No, go back').then((result) => {
        if (updatedEmployee && updateUser && result) {
          dispatch(updateEmployee({ id, employeeData: updatedEmployee }));
          dispatch(updateUser({ _id, userData: updatedUser }));
        } else {
          console.log("edition canceled...");
        }
      });
    }
  };

  return (
    <form action="" className="form_container" onSubmit={onSubmit}>
      {formFields.map((field) => (
        <FormGroup key={field.name} {...field} />
      ))}
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditForm;
