const asyncHandler = require('express-async-handler');
const Employee = require('../models/Employee');
const Task = require('../models/Task');

/**
 * @desc    Get dashboard statistics and analytics data
 * @route   GET /api/dashboard/stats
 * @access  Private
 */
const getDashboardStats = asyncHandler(async (req, res) => {
  // Parallel DB queries for performance
  const [
    totalEmployees,
    activeEmployees,
    todoTasks,
    inProgressTasks,
    doneTasks,
    recentEmployees,
    recentTasks,
    departmentBreakdown,
    priorityBreakdown,
  ] = await Promise.all([
    Employee.countDocuments(),
    Employee.countDocuments({ status: 'Active' }),
    Task.countDocuments({ status: 'Todo' }),
    Task.countDocuments({ status: 'In Progress' }),
    Task.countDocuments({ status: 'Done' }),
    Employee.find().sort({ createdAt: -1 }).limit(5).select('name email department role status avatar createdAt'),
    Task.find()
      .sort({ createdAt: -1 })
      .limit(8)
      .populate('assignedTo', 'name avatar')
      .select('title status priority assignedTo createdAt dueDate'),
    Employee.aggregate([
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    Task.aggregate([
      { $group: { _id: '$priority', count: { $sum: 1 } } },
    ]),
  ]);

  // Build chart data for task status
  const taskChartData = [
    { name: 'Todo', value: todoTasks, color: '#6366f1' },
    { name: 'In Progress', value: inProgressTasks, color: '#f59e0b' },
    { name: 'Done', value: doneTasks, color: '#10b981' },
  ];

  // Build department chart data
  const departmentChartData = departmentBreakdown.map((dept) => ({
    name: dept._id,
    employees: dept.count,
  }));

  // Priority distribution
  const priorityData = priorityBreakdown.map((p) => ({
    name: p._id,
    count: p.count,
  }));

  res.json({
    success: true,
    data: {
      stats: {
        totalEmployees,
        activeEmployees,
        inactiveEmployees: totalEmployees - activeEmployees,
        pendingTasks: todoTasks + inProgressTasks,
        completedTasks: doneTasks,
        totalTasks: todoTasks + inProgressTasks + doneTasks,
      },
      charts: {
        taskStatus: taskChartData,
        departmentBreakdown: departmentChartData,
        priorityDistribution: priorityData,
      },
      recentActivity: {
        employees: recentEmployees,
        tasks: recentTasks,
      },
    },
  });
});

module.exports = { getDashboardStats };
