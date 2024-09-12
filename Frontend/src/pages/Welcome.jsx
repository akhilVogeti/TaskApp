import React from 'react';
import { Link } from 'react-router-dom';
const Welcome = () =>{
    document.title='Welcome to Task Manager';
    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900">
            <h1 className="text-3xl font-bold mb-20 text-gray-200">Welcome to Task Manager</h1>
            <p className="mb-8 text-gray-200">Register or Login to use Task Manager</p>
            <div className="space-x-4">
                <button className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-600" >
                    <Link to="/register">Register</Link> 
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500">
                    <Link to="/login">Login</Link>
                </button>
            </div>
        </div>
    );
}

export default Welcome;