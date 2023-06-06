// import React from "react";
// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import Home from "../pages/Home";
// import Layout from "../components/UI/Layout";
// import Register from "../pages/Register";
// import Login from "../pages/Login";

// const Routing = () => {
//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           {/* Layout */}
//           <Route path="/" element={<Layout />}>
//             <Route index element={<Navigate to="/home" />} />
//           </Route>

//           {/* Pages */}
//           <Route path="/" element={<Layout />}>
//             <Route exact path="/home" element={<Home />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/login" element={<Login />} />

//           </Route>

//           {/* Not Found */}
//           <Route path="*" element={<h1> Pagina no encontrada. </h1>} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// };

// export default Routing;
