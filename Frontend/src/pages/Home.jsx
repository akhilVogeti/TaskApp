import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../api';
import Logout from '../components/Auth/Logout';
import TaskForm from '../components/Tasks/TaskForm';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    document.title = 'Home'
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await getTasks(token);
        setTasks(response.data);
      } catch (err) {
        console.error('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await deleteTask(id, token);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error('Failed to delete task');
    }
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
  };

  const handleFormSubmit = () => {
    setCurrentTask(null); // Clear the current task after submission
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await getTasks(token);
        setTasks(response.data);
      } catch (err) {
        console.error('Failed to fetch tasks');
      }
    };

    fetchTasks();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome to your Task Manager</h2>
      <Logout />
      <TaskForm currentTask={currentTask} onFormSubmit={handleFormSubmit} />
      <h2>Your Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className='task-item'>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.completed ? 'Completed' : 'Not Completed'}</p>
            <button className='edit-button' onClick={() => handleEdit(task)}>Edit</button>
            <button className='delete-button' onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
     
    </div>
  );
};

export default Home;

