// PrivateRoutes.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  //let token from local storage
  const token = localStorage.getItem('token');
  //let token =false;

  return (
    token ? <Outlet /> : <Navigate to="/login" />
  );
};

export default PrivateRoutes;
