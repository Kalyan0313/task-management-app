import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { getTasks, createTask, deleteTask, updateTask } from '../api/taskApi';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import './Dashboard.css';

const Dashboard = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchTasks = async () => {
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const { data } = await getTasks(token);
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        alert('Failed to load tasks. Please log in again.');
        navigate('/login'); 
      }
    };
    fetchTasks();
  }, [token, navigate]); 

  const handleDelete = async (id) => {
    try {
      await deleteTask(id, token);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  const handleEdit = (task) => {
    console.log("Editing task:", task);
    setEditingTask(task); 
  };

  const handleFormSubmit = async (task) => {
    console.log("Submitting task:", task);
    try {
      if (task._id) {
        // Update existing task
        await updateTask(task._id, task, token);
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t._id === task._id ? task : t))
        );
      } else {
        // Create new task
        await createTask(task, token);
        const { data } = await getTasks(token);
        setTasks(data);
      }
      setEditingTask(null); // Clear the editing state after submission
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Failed to save task. Please try again.');
    }
  };
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Task Dashboard</h1>
      <div className="dashboard-content">
        <div className="task-form-container">
          <TaskForm
            onSubmit={handleFormSubmit}
            initialTask={editingTask || {}} 
          />
        </div>
        <div className="task-list-container">
          <TaskList tasks={tasks} onDelete={handleDelete} onEdit={handleEdit} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
