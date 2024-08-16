import React from 'react';
import { Link } from 'react-router-dom';
const Welcome = () =>{
    document.title='Welcome to Task Manager';
    return(
        <div className='welcome-block'>
            <h1>Welcome to Task Manager</h1>
            <p>Register or Login to use Task Manager</p>
            <button>
            <Link to="/register">Register</Link> 
            </button>
            <button>
            <Link to="/login">Login</Link>
            </button>
        </div>
    );
}

export default Welcome;