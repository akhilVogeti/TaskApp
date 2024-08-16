
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
    <button className='logout-button' onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
