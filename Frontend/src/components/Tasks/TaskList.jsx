// TaskList.jsx
import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, deleteTask, updateTask }) => {
  const columns = [[], [], [], []];
  tasks.forEach((task, index) => {
    columns[index % 4].push(task);
  });

  return (
   //<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 ">

    <div className="grid grid-cols-4 gap-4 p-4">
      {columns.map((columnTasks, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-5">
          {columnTasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
      
        ))}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
