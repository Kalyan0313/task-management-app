import React from 'react';
import './TaskList.css';

const TaskList = ({ tasks, onDelete, onEdit }) => (
  <div className="task-list-container">
    <h2 className="task-list-title">Task List</h2>
    <div className="list-group">
      {tasks.map((task) => (
        <div key={task._id} className="list-group-item">
          <h5 className="task-title">{task.title}</h5>
          <p className="task-description">{task.description}</p>
          <p className="task-status">
            <strong>Status:</strong> {task.status}
          </p>
          <small className="task-due-date">
             Due: {new Date(task.dueDate).toLocaleDateString('en-GB')}
          </small>
          <div className="button-container">
            <button
              className="btn btn-info"
              onClick={() => onEdit(task)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onDelete(task._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TaskList;