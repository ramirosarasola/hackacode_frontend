import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EnhancedTable from '../components/UI/EnhancedTable';
import { fetchEmployees } from '../slices/employeeSlice';
import "../styles/pages/EmployeesData.css";

const EmployeesData = () => {
  const dispatch = useDispatch();
  const { employees, loading, error } = useSelector(state => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
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
      <EnhancedTable employees={employees} />
    </section>
  );
};

export default EmployeesData;
