const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');

/**
 * @desc    Get all tasks with optional filtering
 * @route   GET /api/tasks
 * @access  Private
 */
const getTasks = asyncHandler(async (req, res) => {
  const { status = '', priority = '', assignedTo = '', search = '' } = req.query;

  const query = {};
  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (assignedTo) query.assignedTo = assignedTo;
  if (search.trim()) {
    query.title = { $regex: search, $options: 'i' };
  }

  const tasks = await Task.find(query)
    .populate('assignedTo', 'name email department avatar')
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 });

  res.json({ success: true, data: tasks, count: tasks.length });
});

/**
 * @desc    Get single task by ID
 * @route   GET /api/tasks/:id
 * @access  Private
 */
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)
    .populate('assignedTo', 'name email department avatar')
    .populate('createdBy', 'name email');

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  res.json({ success: true, data: task });
});

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @access  Private
 */
const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, assignedTo, dueDate, tags } = req.body;

  if (!title) {
    res.status(400);
    throw new Error('Task title is required');
  }

  const task = await Task.create({
    title,
    description,
    status: status || 'Todo',
    priority: priority || 'Medium',
    assignedTo: assignedTo || null,
    dueDate: dueDate || null,
    tags: tags || [],
    createdBy: req.user._id,
  });

  const populatedTask = await Task.findById(task._id)
    .populate('assignedTo', 'name email department avatar')
    .populate('createdBy', 'name email');

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: populatedTask,
  });
});

/**
 * @desc    Update task (including status changes for Kanban)
 * @route   PUT /api/tasks/:id
 * @access  Private
 */
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  )
    .populate('assignedTo', 'name email department avatar')
    .populate('createdBy', 'name email');

  res.json({
    success: true,
    message: 'Task updated successfully',
    data: updatedTask,
  });
});

/**
 * @desc    Delete task
 * @route   DELETE /api/tasks/:id
 * @access  Private
 */
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  await task.deleteOne();

  res.json({
    success: true,
    message: 'Task deleted successfully',
    data: { id: req.params.id },
  });
});

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
