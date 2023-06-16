import { Route, Routes } from "react-router-dom";
import Layout from "../components/UI/Layout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Games from "../pages/Games";
import EmployeesData from "../pages/EmployeesData";
import MaintenancePage from "../components/UI/MaintenancePage";
import EditEmployee from "../components/Employees/EditEmployee";
import GameForm from "../components/Games/GameForm";

const Routing = ({ isAuthenticated }) => {
  return (
    <Routes>
      {/* Layout */}
      <Route path="/" element={isAuthenticated ? <Layout /> : <Login />} >
        {/* Pages */}
        <Route exact path="/" element={<Home />} />
        <Route path="/employees/new" element={<Register />} />
        <Route path="/employees/data" element={<EmployeesData />} />
        <Route path="/employees/edit/:id" element={<EditEmployee />} />
        <Route path="/games/new" element={<GameForm />} />
        <Route path="/games" element={<Games />} />
      </Route>

      {/* Not Found */}
      <Route path="*" element={<MaintenancePage />} />
    </Routes>
  );
};

export default Routing;