
import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask, updateTask } from '../../api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
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

  

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Your Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.completed ? 'Completed' : 'Not Completed'}</p>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
            <button onClick={() => handleUpdate(task._id)}>Edit</button>
          </li>
        ))}

      </ul>
    </div>
  );
};

export default TaskList;
