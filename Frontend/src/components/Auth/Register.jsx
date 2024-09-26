
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
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-900">
      <h2 className="text-3xl font-bold mb-10">Welcome to Task Manager</h2>
      <form className="flex flex-col items-center w-full max-w-sm border border-zinc-600 p-8 rounded-lg shadow-xl space-y-6"
       onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-5">Enter details to register</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 bg-zinc-200 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 bg-zinc-200 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 bg-zinc-200 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="w-40 mt-4 px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-400">Register</button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
      <p className="mt-4 text-gray-900">Existing user? Login here</p>
      <Link to="/login" className="underline hover:text-blue-400">Login</Link>
    </div>


  );
};

export default Register;
