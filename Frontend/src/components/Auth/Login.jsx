
import React, { useState, useEffect } from 'react';
import { login } from '../../api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Login'; // Set the document title
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      localStorage.setItem('token', response.data.token); // Save token
      navigate('/home'); // Redirect to home
    } catch (err) {
      setError('Login failed. Check credentials or Register if you are a new user');
    }
  };

  return (
    <div className='login-block'>
      <h2>Welcome to Task Manager</h2>
      <form className='login-form' onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
      <p>New user? Register here</p>
      <Link to="/register">Register</Link>
   </div>
  );
};

export default Login;
