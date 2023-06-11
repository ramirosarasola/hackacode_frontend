import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/UI/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Games from './pages/Games';
import EmployeesData from "./pages/EmployeesData";
import { loadUser } from "./slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import MaintenancePage from "./components/UI/MaintenancePage";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  if (localStorage.getItem('token') && isLoading) {
    return <p>Loading</p>;
  }


  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Layout */}
          {/* Pages */}
          {!isAuthenticated ? (
            <Route exact path="/" element={<Login />} />
          ) : (
            <Route path="/" element={<Layout />}>
              <Route exact path="/" element={<Home />} />
              <Route path="/employees/new" element={<Register />} />
              <Route path="/employees/data" element={<EmployeesData />} />
              <Route path="/games" element={<Games />} />
            </Route>
          )}
          {/* Not Found */}
          <Route path="*" element={<MaintenancePage></MaintenancePage>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
