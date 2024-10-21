import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

export const getTasks = async (token) => {
  return axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
};

export const createTask = async (taskData, token) => {
  return axios.post(API_URL, taskData, { headers: { Authorization: `Bearer ${token}` } });
};

export const updateTask = async (id, taskData, token) => {
  return axios.put(`${API_URL}/${id}`, taskData, { headers: { Authorization: `Bearer ${token}` } });
};

export const deleteTask = async (id, token) => {
  return axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};
