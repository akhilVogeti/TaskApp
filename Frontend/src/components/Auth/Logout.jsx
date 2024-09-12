
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../api';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <button className=" px-4 py-1 bg-red-700 text-white font-bold rounded hover:bg-red-600" onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
