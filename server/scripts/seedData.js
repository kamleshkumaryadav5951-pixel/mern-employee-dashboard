/**
 * Seed Script — Populate DB with demo employees, tasks, and an admin user
 * Run: npm run seed
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');
const Employee = require('../models/Employee');
const Task = require('../models/Task');

const demoEmployees = [
  { name: 'Arjun Sharma', email: 'arjun.sharma@company.com', phone: '+91-9876543210', department: 'Engineering', role: 'Senior Software Engineer', status: 'Active', location: 'Bangalore', salary: 120000, joinDate: new Date('2022-03-15') },
  { name: 'Priya Patel', email: 'priya.patel@company.com', phone: '+91-9876543211', department: 'Design', role: 'UI/UX Designer', status: 'Active', location: 'Mumbai', salary: 95000, joinDate: new Date('2022-06-01') },
  { name: 'Rahul Verma', email: 'rahul.verma@company.com', phone: '+91-9876543212', department: 'Marketing', role: 'Marketing Manager', status: 'Active', location: 'Delhi', salary: 105000, joinDate: new Date('2021-11-10') },
  { name: 'Sneha Gupta', email: 'sneha.gupta@company.com', phone: '+91-9876543213', department: 'HR', role: 'HR Specialist', status: 'Active', location: 'Hyderabad', salary: 80000, joinDate: new Date('2023-01-20') },
  { name: 'Vikram Singh', email: 'vikram.singh@company.com', phone: '+91-9876543214', department: 'Engineering', role: 'Backend Developer', status: 'Active', location: 'Pune', salary: 100000, joinDate: new Date('2022-08-05') },
  { name: 'Anjali Mehta', email: 'anjali.mehta@company.com', phone: '+91-9876543215', department: 'Finance', role: 'Financial Analyst', status: 'Active', location: 'Chennai', salary: 90000, joinDate: new Date('2023-03-12') },
  { name: 'Rohan Das', email: 'rohan.das@company.com', phone: '+91-9876543216', department: 'Sales', role: 'Sales Executive', status: 'On Leave', location: 'Kolkata', salary: 75000, joinDate: new Date('2023-05-01') },
  { name: 'Kavya Nair', email: 'kavya.nair@company.com', phone: '+91-9876543217', department: 'Product', role: 'Product Manager', status: 'Active', location: 'Bangalore', salary: 130000, joinDate: new Date('2021-09-15') },
  { name: 'Aditya Kumar', email: 'aditya.kumar@company.com', phone: '+91-9876543218', department: 'Engineering', role: 'Frontend Developer', status: 'Active', location: 'Hyderabad', salary: 95000, joinDate: new Date('2023-02-28') },
  { name: 'Meera Joshi', email: 'meera.joshi@company.com', phone: '+91-9876543219', department: 'Operations', role: 'Operations Manager', status: 'Inactive', location: 'Pune', salary: 110000, joinDate: new Date('2020-07-01') },
  { name: 'Suresh Reddy', email: 'suresh.reddy@company.com', phone: '+91-9876543220', department: 'Engineering', role: 'DevOps Engineer', status: 'Active', location: 'Bangalore', salary: 115000, joinDate: new Date('2022-01-10') },
  { name: 'Deepika Shah', email: 'deepika.shah@company.com', phone: '+91-9876543221', department: 'Design', role: 'Graphic Designer', status: 'Active', location: 'Mumbai', salary: 78000, joinDate: new Date('2023-04-15') },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany(),
      Employee.deleteMany(),
      Task.deleteMany(),
    ]);
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@dashboard.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log('👤 Admin user created: admin@dashboard.com / admin123');

    // Create employees
    const createdEmployees = await Employee.insertMany(demoEmployees);
    console.log(`👥 Created ${createdEmployees.length} demo employees`);

    // Create tasks assigned to various employees
    const demoTasks = [
      { title: 'Redesign landing page', description: 'Update the company landing page with new brand guidelines and modern design patterns', status: 'In Progress', priority: 'High', assignedTo: createdEmployees[1]._id, dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
      { title: 'Implement user authentication API', description: 'Build secure JWT-based authentication endpoints for the mobile app', status: 'Done', priority: 'High', assignedTo: createdEmployees[0]._id, dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
      { title: 'Q2 Marketing Campaign Planning', description: 'Plan and execute Q2 digital marketing campaigns across all channels', status: 'Todo', priority: 'Medium', assignedTo: createdEmployees[2]._id, dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) },
      { title: 'Employee onboarding documentation', description: 'Update HR onboarding documents and create digital forms', status: 'In Progress', priority: 'Medium', assignedTo: createdEmployees[3]._id, dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) },
      { title: 'Database optimization and indexing', description: 'Optimize slow queries and add proper indexes to improve performance', status: 'Todo', priority: 'High', assignedTo: createdEmployees[4]._id, dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
      { title: 'Monthly financial report', description: 'Prepare and submit the monthly P&L and expense reports', status: 'Done', priority: 'High', assignedTo: createdEmployees[5]._id, dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
      { title: 'Sales pipeline review', description: 'Review Q2 sales pipeline and update CRM with latest deals', status: 'In Progress', priority: 'Medium', assignedTo: createdEmployees[6]._id, dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) },
      { title: 'Product roadmap Q3 planning', description: 'Define and prioritize product features for Q3 roadmap', status: 'Todo', priority: 'High', assignedTo: createdEmployees[7]._id, dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) },
      { title: 'Mobile app UI implementation', description: 'Implement Figma designs for the new mobile app screens', status: 'In Progress', priority: 'High', assignedTo: createdEmployees[8]._id, dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000) },
      { title: 'Set up CI/CD pipeline', description: 'Configure GitHub Actions workflow for automated testing and deployment', status: 'Done', priority: 'Medium', assignedTo: createdEmployees[10]._id, dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
      { title: 'Brand identity refresh', description: 'Create new logo variations and update brand color palette', status: 'Todo', priority: 'Low', assignedTo: createdEmployees[11]._id, dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000) },
      { title: 'API documentation update', description: 'Update Swagger/OpenAPI docs to reflect latest endpoint changes', status: 'Todo', priority: 'Low', assignedTo: createdEmployees[0]._id, dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) },
      { title: 'Performance monitoring setup', description: 'Integrate Datadog for application performance monitoring and alerting', status: 'In Progress', priority: 'Medium', assignedTo: createdEmployees[10]._id, dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000) },
      { title: 'User feedback analysis', description: 'Analyze Q1 user feedback surveys and create actionable insights report', status: 'Done', priority: 'Low', assignedTo: createdEmployees[7]._id, dueDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    ];

    const tasksWithCreator = demoTasks.map((task) => ({
      ...task,
      createdBy: adminUser._id,
    }));

    const createdTasks = await Task.insertMany(tasksWithCreator);
    console.log(`📋 Created ${createdTasks.length} demo tasks`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔑 Login Credentials:');
    console.log('   Email:    admin@dashboard.com');
    console.log('   Password: admin123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();
