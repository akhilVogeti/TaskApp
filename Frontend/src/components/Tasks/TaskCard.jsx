// TaskCard.jsx
import React, { useState } from 'react';
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

const TaskCard = ({ task, deleteTask, updateTask, onSave, onCancel, isNew }) => {
  const [isEditing, setIsEditing] = useState(isNew || false);
  const [editedTask, setEditedTask] = useState({...task});
  const token = localStorage.getItem('token'); 

  const handleSaveClick = () => {
    if (isNew) {
      onSave(editedTask); // Save new task
    } else {
      updateTask(editedTask); // Update existing task
    }
    setIsEditing(false);
  };

  const handleDeleteClick = (id) => deleteTask(id);

  const handleCheckboxChange = async(id) => {
    const updatedTask = { ...task, completed: !task.completed };
    setEditedTask(updatedTask);
    updateTask(updatedTask);
  };

  return (
    <>
      {isEditing ? (
        <div className="bg-gray-200 text-gray-900 pt-0 mb-2 rounded-lg shadow-lg p-4 flex flex-col w-full max-w-md ">
          <p className="mt-1 text-xl">Enter details</p>
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            placeholder="Task title"
            className="w-full mt-2 p-2 mb-2 rounded border border-gray-600 bg-gray-300 text-gray-900"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            placeholder="Task Description"
            className="w-full p-2 mb-2 rounded border border-gray-600 bg-gray-300 text-gray-900 max-h-32 overflow-auto"
            
          />
          <div className="mt-2 flex justify-between items-center">
          <button onClick={handleSaveClick} className="w-30 px-2 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition duration-300">
            Save
          </button>
          {isNew && (
            <button onClick={onCancel} className="w-30 px-2 py-2  bg-red-600 text-white rounded hover:bg-red-500 transition duration-300">
              Cancel
            </button>
          )}
          </div>
        </div>
      ) : (
        <div className="bg-gray-200 text-gray-900 pt-0 rounded-lg border border-gray-500 shadow-xl ">
          
           <div className=" px-4 bg-gray-300 rounded-lg flex justify-between items-center ">
              <button onClick={() => handleDeleteClick(task._id)} >
                <FaRegTrashAlt />
              </button>
              <i className="truncate max-w-[75%]">{task.title}</i>
              <button onClick={() => setIsEditing(true)} > 
                <FaEdit />
              </button>
            </div>
          
          <p className="px-4 mt-2 mb-2 max-h-32 overflow-auto">{task.description}</p>
          <svg width="100%" height="1">
            <line x1="5%" y1="0" x2="95%" y2="0" stroke="gray" strokeWidth="1" />
          </svg>
          
          <div className=" mt-1 px-4 mb-2 flex justify-between items-center">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleCheckboxChange(task._id)}   
            />
            <p className={` px-2 font-bold ${task.completed ? 'text-green-600' : 'text-red-600'}`}>
            {task.completed ? 'Completed' : 'Not Completed'}
            </p>
          </div>
          
         
        </div>
      )}
    </>
  );
};

export default TaskCard;








