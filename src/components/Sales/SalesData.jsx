import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSales, deleteSale } from "../../slices/saleSlice";
import SalesTableData from "./SalesTableData.jsx";
import '../../styles/pages/Sales.css';

const SalesData = () => {
  const dispatch = useDispatch();
  const { sales } = useSelector((state) => state.sales);

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
      <h1>Sales</h1>
      <SalesTableData
        sales={sales}
        onDeleteSale={handleDeleteSale}
        onUpdateSale={handleUpdateSale}
      />
    </div>
  );
};

export default SalesData;
