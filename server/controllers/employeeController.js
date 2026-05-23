const asyncHandler = require('express-async-handler');
const Employee = require('../models/Employee');

/**
 * @desc    Get all employees with pagination, search, and filter
 * @route   GET /api/employees
 * @access  Private
 */
const getEmployees = asyncHandler(async (req, res) => {
  const {
    search = '',
    department = '',
    status = '',
    page = 1,
    limit = 10,
  } = req.query;

  const query = {};

  // Search by name, email, or role
  if (search.trim()) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { role: { $regex: search, $options: 'i' } },
    ];
  }

  if (department) query.department = department;
  if (status) query.status = status;

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const [employees, totalCount] = await Promise.all([
    Employee.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    Employee.countDocuments(query),
  ]);

  res.json({
    success: true,
    data: employees,
    pagination: {
      currentPage: pageNum,
      totalPages: Math.ceil(totalCount / limitNum),
      totalCount,
      hasNextPage: pageNum < Math.ceil(totalCount / limitNum),
      hasPrevPage: pageNum > 1,
    },
  });
});

/**
 * @desc    Get single employee by ID
 * @route   GET /api/employees/:id
 * @access  Private
 */
const getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }

  res.json({ success: true, data: employee });
});

/**
 * @desc    Create a new employee
 * @route   POST /api/employees
 * @access  Private
 */
const createEmployee = asyncHandler(async (req, res) => {
  const { name, email, phone, department, role, status, joinDate, salary, location } = req.body;

  if (!name || !email || !department || !role) {
    res.status(400);
    throw new Error('Please provide name, email, department, and role');
  }

  const emailExists = await Employee.findOne({ email });
  if (emailExists) {
    res.status(400);
    throw new Error('An employee with this email already exists');
  }

  const employee = await Employee.create({
    name,
    email,
    phone,
    department,
    role,
    status,
    joinDate,
    salary,
    location,
  });

  res.status(201).json({
    success: true,
    message: 'Employee added successfully',
    data: employee,
  });
});

/**
 * @desc    Update employee
 * @route   PUT /api/employees/:id
 * @access  Private
 */
const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }

  // Check if updating email to an already-taken one
  if (req.body.email && req.body.email !== employee.email) {
    const emailExists = await Employee.findOne({ email: req.body.email });
    if (emailExists) {
      res.status(400);
      throw new Error('Another employee with this email already exists');
    }
  }

  const updatedEmployee = await Employee.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    message: 'Employee updated successfully',
    data: updatedEmployee,
  });
});

/**
 * @desc    Delete employee
 * @route   DELETE /api/employees/:id
 * @access  Private
 */
const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }

  await employee.deleteOne();

  res.json({
    success: true,
    message: 'Employee deleted successfully',
    data: { id: req.params.id },
  });
});

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
