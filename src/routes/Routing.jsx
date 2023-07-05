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
import Customers from "../pages/Customers";
import SalesForm from "../components/Sales/SalesForm";
import SalesData from "../components/Sales/SalesData";
import StatisticsPage from "../pages/StatisticsPage";
import GameEditor from "../components/Games/GameEditor";
import CustomersData from "../components/Customers/CustomersData";
import Tickets from "../components/Tickets/Tickets";

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
        <Route path="/games/edit/:id" element={<GameEditor/>} />
        <Route path="/games" element={<Games />} />
        <Route path="/customers/new" element={<Customers />} />
        <Route path="/customers/data" element={<CustomersData />} />
        <Route path="/sales/new" element={<SalesForm />} />
        <Route path="/sales" element={<SalesData />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/tickets" element={<Tickets />} />
      </Route>

      {/* Not Found */}
      <Route path="*" element={<MaintenancePage />} />
    </Routes>
  );
};

export default Routing;
