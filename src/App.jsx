import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { loadUser } from "./slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Routing from "./routes/Routing";

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
        {/* Routing */}
        <Routing isAuthenticated={isAuthenticated} />
      </BrowserRouter>
    </>
  );
};

export default App;
