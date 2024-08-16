
import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../../api';

const TaskForm = ({ currentTask, onFormSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setCompleted(currentTask.completed);
    } else {
      setTitle('');
      setDescription('');
      setCompleted(false);
    }
  }, [currentTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      if (currentTask) {
        await updateTask(currentTask._id, { title, description, completed }, token);
      } else {
        await createTask({ title, description, completed }, token);
      }
      setTitle('');
      setDescription('');
      setCompleted(false);

      onFormSubmit(); // Notify Home component to refresh tasks
    } catch (err) {
      setError('Failed to save task');
    }
  };

  const handleCancelEdit = () => {
    onFormSubmit(); // Reset form by clearing currentTask in Home component
  };

  return (
    <div className='task-form-block'>
      <form className='task-form' onSubmit={handleSubmit}>
        <h2>{currentTask ? 'Update Task' : 'Add Task'}</h2>
        <div className='task-form-content'>
          <label>
            Title
            <input 
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Description
            <textarea
              className='task-form-description'
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label>
            Completed
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
          </label>
        </div>
        <div className='task-form-buttons'>
          <button type="submit"> {currentTask ? 'Update Task' : 'Create Task'}</button>
          {currentTask && <button className='cancel-button' type="button" onClick={handleCancelEdit}>Cancel</button>}
        </div>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default TaskForm;

