import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EnhancedTable from '../components/UI/EnhancedTable';
import { fetchEmployees } from '../slices/employeeSlice';
import { fetchUsers } from '../slices/userSlice';
import "../styles/pages/EmployeesData.css";

const EmployeesData = () => {
  const dispatch = useDispatch();
  const { employees, loading, error } = useSelector(state => state.employees);
  const { users } = useSelector(state => state.users);
  // console.log(users);

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchUsers());
    
  }, [dispatch]);

  if (loading) {
    return <div>Cargando empleados...</div>;
  }

  if (error) {
    return <div>Error al cargar los empleados: {error}</div>;
  }


  return (
    <section className='employees__data'>
      <h2>Lista de Empleados</h2>
      <EnhancedTable employees={employees} users={users} />
    </section>
  );
};

export default EmployeesData;
