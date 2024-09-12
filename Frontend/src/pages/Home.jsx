import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask, updateTask, createTask } from '../api';
import Logout from '../components/Auth/Logout';
import TaskList from '../components/Tasks/TaskList';
import TaskCard from '../components/Tasks/TaskCard';
import { FaPlusCircle } from "react-icons/fa";


const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const token = localStorage.getItem('token'); // Retrieve token from local storage


  useEffect(() => {
    document.title = 'Home'
    const fetchTasks = async () => {
      try {
        const response = await getTasks(token);
        setTasks(response.data);
      } catch (err) {
        console.error('Failed to fetch tasks');
      }
    };
    fetchTasks();
  }, []);

  const handleAddTaskClick = () => {
    console.log('in add new task handler')
    setShowAddTask(true);
  };

  const handleCancelAddTask = () => {
    setShowAddTask(false);
  };

  const handleAddNewTask = async (task) => {
    try {
      console.log('Adding task:', task);
      setShowAddTask(false);
      const response = await createTask(task, token);
      setTasks([...tasks, response.data]);
      
    } catch (error) {
      console.error('Error adding task:', error);
      console.error('Error response data:', error.response.data);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const response = await updateTask(updatedTask._id, updatedTask, token);
      setTasks(tasks.map(task => (task._id === updatedTask._id ? response.data : task)));
    } catch (error) {
      console.error('Error updating task:', error);
      console.error('Error response data:', error.response.data);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id, token);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
      console.error('Error response data:', error.response.data);
    }
  };

  

  return (
    <div className="min-h-screen bg-zinc-900 text-gray-200" >
      <div className="flex justify-between items-center">
        <button onClick={handleAddTaskClick} className="flex items-center space-x-2 p-4">
          <FaPlusCircle />
          <span>Add Task</span> 
        </button>
        <h1 className="text-3xl font-bold text-center justify-center item-center"> Manage your tasks</h1>
        <Logout/>
      </div>
      <svg width="100%" height="1">
            <line x1="0" y1="0" x2="100%" y2="0" stroke="gray" strokeWidth="1" />
       </svg>
      {/* Add Task Form (Editable Task Card) */}
      {showAddTask && (
        <TaskCard
          task={{ title: '', description: '', completed: false }}
          onSave={handleAddNewTask}
          onCancel={handleCancelAddTask}
          isNew={true}
        />
      )}
       

      {/* Task List */}
      <h2 className='px-4 pt-2 mt-1 text-xl font-bold'>Your Tasks</h2>
      <TaskList tasks={tasks} deleteTask={handleDeleteTask} updateTask={handleUpdateTask} />
    </div>
  );
};

export default HomePage;


