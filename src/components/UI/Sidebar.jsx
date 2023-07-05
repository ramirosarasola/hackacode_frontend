import React, { useEffect, useState } from "react";
import "../../styles/components/UI/Sidebar.css";
import LogoutIcon from "@mui/icons-material/Logout";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Engineering as EngineeringIcon,
  EmojiPeople as EmojiPeopleIcon,
  Attractions as AttractionsIcon,
  Loyalty as LoyaltyIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { loadUser, logout } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, getEmployee } from "../../slices/employeeSlice";

const Sidebar = () => {
  const [open, setOpen] = useState({
    employees: false,
    customers: false,
    games: false,
    sales: false,
  });

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, []);

  const handleLogout = () => {
    console.log("see you...");
    dispatch(logout());
  };

  const handleClick = (section) => {
    setOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleStatistics = () => {
    navigate("/statistics");
  };

  return (
    <section
      className="sidebar__menu"
      anchor="left"
      open={true}
      style={{ marginRight: 250 }}
    >
      <Box
        sx={{
          width: 250,
          height: "100vh",
          backgroundColor: "secondary.main",
          position: "fixed",
        }}
      >
        <Box sx={{ padding: "20px" }}>
          <h4 style={{ color: "#ffff" }}>Menu</h4>
          <List>
            <Link to="/" style={{ color: "#ffff", textDecoration: "none" }}>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText disableTypography>Admin Panel</ListItemText>
              </ListItemButton>
            </Link>
            <ListItemButton onClick={() => handleClick("employees")}>
              <ListItemIcon>
                <EngineeringIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary="Employees"
                style={{ color: "#ffff" }}
              />
              {open.employees ? (
                <ExpandLess style={{ color: "#ffff" }} />
              ) : (
                <ExpandMore style={{ color: "#ffff" }} />
              )}
            </ListItemButton>
            <Collapse in={open.employees} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {(userRole === "admin" || employeeType === "manager") && (
                  <Link
                    to="/employees/new"
                    style={{ color: "#ffff", textDecoration: "none" }}
                  >
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="New Employee" disableTypography />
                    </ListItemButton>
                  </Link>
                )}

                <Link
                  to="/employees/data"
                  style={{ color: "#ffff", textDecoration: "none" }}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText disableTypography primary="Data Employees" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>
            <ListItemButton onClick={() => handleClick("customers")}>
              <ListItemIcon>
                <EmojiPeopleIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary="Customers"
                style={{ color: "#ffff" }}
              />
              {open.customers ? (
                <ExpandLess style={{ color: "#ffff" }} />
              ) : (
                <ExpandMore style={{ color: "#ffff" }} />
              )}
            </ListItemButton>
            <Collapse in={open.customers} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {
                  <Link
                    to="/customers/new"
                    style={{ color: "#ffff", textDecoration: "none" }}
                  >
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText disableTypography primary="New Customer" />
                    </ListItemButton>
                  </Link>
                }

                <Link
                  to="/customers/data"
                  style={{ color: "#ffff", textDecoration: "none" }}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText disableTypography primary="Data Customers" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>
            <ListItemButton onClick={() => handleClick("games")}>
              <ListItemIcon>
                <AttractionsIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary="Games"
                style={{ color: "#ffff" }}
              />
              {open.games ? (
                <ExpandLess style={{ color: "#ffff" }} />
              ) : (
                <ExpandMore style={{ color: "#ffff" }} />
              )}
            </ListItemButton>
            <Collapse in={open.games} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {(employeeType === "employee" || userRole === 'admin') && (
                  <Link
                    to="/games/new"
                    style={{ color: "#ffff", textDecoration: "none" }}
                  >
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText disableTypography primary="New Game" />
                    </ListItemButton>
                  </Link>
                )}

                <Link
                  to="/games"
                  style={{ color: "#ffff", textDecoration: "none" }}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText disableTypography primary="Data Games" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>
            <ListItemButton onClick={() => handleClick("sales")}>
              <ListItemIcon>
                <LoyaltyIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary="Sales"
                style={{ color: "#ffff" }}
              />
              {open.sales ? (
                <ExpandLess style={{ color: "#ffff" }} />
              ) : (
                <ExpandMore style={{ color: "#ffff" }} />
              )}
            </ListItemButton>
            <Collapse in={open.sales} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {
                  (userRole === 'admin' || employeeType === 'employee')
                  &&
                  <Link
                  to="/sales/new"
                  style={{ color: "#ffff", textDecoration: "none" }}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText disableTypography primary="New Sale" />
                  </ListItemButton>
                </Link>}
                <Link
                  to="/sales"
                  style={{ color: "#ffff", textDecoration: "none" }}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText disableTypography primary="Data Sales" />
                  </ListItemButton>
                </Link>
                <Link
                  to="/tickets"
                  style={{ color: "#ffff", textDecoration: "none" }}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText disableTypography primary="Tickets" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>
            <ListItemButton onClick={handleStatistics}>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary="Statistics"
                style={{ color: "#ffff" }}
              />
            </ListItemButton>
          </List>
          <button className="logout" onClick={() => handleLogout()}>
            <LogoutIcon style={{ color: "#ffff" }} />
            <p>Logout</p>
          </button>
        </Box>
      </Box>
    </section>
  );
};

export default Sidebar;
