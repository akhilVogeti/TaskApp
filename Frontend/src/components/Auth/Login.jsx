
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-gray-200">
      <h2 className="text-3xl font-bold mb-20">Login to use Task Manager</h2>
      <form className="flex flex-col items-center w-full max-w-sm bg-zinc-800 p-8 border border-zinc-600 rounded-lg shadow-xl space-y-6"
       onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 bg-zinc-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 bg-zinc-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="w-40 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500">Login</button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
      <p className="mt-8 text-gray-400">New user? Register here</p>
      <Link className="underline hover:text-gray-400" to="/register">Register</Link>     
   </div>
  );
};

export default Login;
