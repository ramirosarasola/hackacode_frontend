import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSales, deleteSale } from "../../slices/saleSlice";
import SalesTableData from "./SalesTableData.jsx";
import '../../styles/pages/Sales.css';

const SalesData = () => {
  const dispatch = useDispatch();
  const { sales } = useSelector((state) => state.sales);
  const { user } = useSelector((state) => state.auth);
  const { employees } = useSelector((state) => state.employees);
  console.log(employees);
  console.log(user);

  const employeeType = employees.find(
    (employee) => employee.user === user.data?._id
  )?.type;

  const userRole = user.data?.role;
  console.log(employeeType);
  console.log(userRole);

  useEffect(() => {
    dispatch(getSales());
  }, [dispatch]);

  const handleDeleteSale = (index) => {
    const saleId = sales[index]._id;
    dispatch(deleteSale(saleId));
  };

  const handleUpdateSale = (index, updatedSale) => {
    console.log(index);
    const sale = sales[index];
    if (sale) {
      const saleData = { ...updatedSale };
      console.log(saleData);
      const id = sale._id;
      dispatch(updateSale({ id, saleData }));
    }
  };

  return (
    <div className="sales__container">
      <h1 style={{textAlign: "center"}}>Sales</h1>
      <SalesTableData
        sales={sales}
        onDeleteSale={handleDeleteSale}
        onUpdateSale={handleUpdateSale}
        userRole={userRole}
        employeeType={employeeType}
      />
    </div>
  );
};

export default SalesData;
