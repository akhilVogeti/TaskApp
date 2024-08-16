
import React, { useState,useEffect } from 'react';
import { register } from '../../api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Register'; // Set the document title
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      navigate('/login'); // Redirect to login
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className='register-block'>
      <h2>Welcome to Task Manager</h2>
      <form className='register-form' onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        {error && <p>{error}</p>}
      </form>
      <p>Existing user? Login here</p>
      <Link to="/login">Login</Link>
    </div>


  );
};

export default Register;
