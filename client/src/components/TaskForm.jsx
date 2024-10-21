import React, { useState, useEffect } from 'react';
import './TaskForm.css'; 

const TaskForm = ({ onSubmit, initialTask = {} }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'Pending',
  });

  // Update the form state when the initialTask changes
  useEffect(() => {
    setTask({
      title: initialTask.title || '',
      description: initialTask.description || '',
      // Ensure dueDate is in the correct format (YYYY-MM-DD)
      dueDate: initialTask.dueDate ? new Date(initialTask.dueDate).toISOString().split('T')[0] : '',
      status: initialTask.status || 'Pending',
    });
  }, [initialTask]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
  };

  return (
    <div className="task-form-container">
      <div className="task-form-card">
        <h2 className="task-form-title">
          {initialTask._id ? 'Edit Task' : 'Create Task'}
        </h2>
        <form onSubmit={handleSubmit} className="task-form">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={task.title}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={task.description}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="form-control mb-2"
            required
          />
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="form-control mb-2"
            required
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button type="submit" className="btn btn-primary">
            {initialTask._id ? 'Update Task' : 'Create Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
