import Task from '../models/Task.js';

// Create a new task
async function createTask(req, res) {
  try {
    const taskData = {
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      user: req.user.id, 
      status: req.body.status, 
    };

    const task = new Task(taskData);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create task.', error });
  }
}

// Get all tasks for the user
async function getTasks(req, res) {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve tasks.', error });
  }
}

// Update a specific task by ID (including status update)
async function updateTask(req, res) {
  try {
    const updateData = {};
    console.log("first gggg",req.body);
    if (req.body.title) updateData.title = req.body.title;
    if (req.body.description) updateData.description = req.body.description;
    if (req.body.dueDate) updateData.dueDate = req.body.dueDate;
    if (req.body.status) updateData.status = req.body.status;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true } // Ensures validators are applied
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update task.', error });
  }
}


// Delete a specific task by ID
async function deleteTask(req, res) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }
    res.json({ message: 'Task deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task.', error });
  }
}

export { createTask, getTasks, updateTask, deleteTask };
