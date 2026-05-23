const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Employee name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      enum: [
        'Engineering',
        'Design',
        'Marketing',
        'Sales',
        'HR',
        'Finance',
        'Operations',
        'Product',
      ],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'On Leave'],
      default: 'Active',
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
    salary: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// Text index for search functionality
employeeSchema.index({ name: 'text', email: 'text', department: 'text', role: 'text' });

module.exports = mongoose.model('Employee', employeeSchema);
