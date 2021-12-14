import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import {Navigate, useRoutes } from "react-router-dom";
//Layouts
import DefaultLayout from "./layouts/DefaultLayout";
//Views
import Dashboard from "./views/dashboard";
import CryptoDetail from "./views/crypto-detail";
function App() {
  
  const mainRoutes = {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {path: '*', element: <Navigate to='/dashboard' />},
      {path: '/', element: <Navigate to='/dashboard' /> },
      {path: 'dashboard', element:  <Dashboard/> },
      {path: 'detail/:id', element:  <CryptoDetail/> },
    ],
  };

  const routing = useRoutes([mainRoutes]);
  return (
    <>{routing}</>
  );
}
export default App;
