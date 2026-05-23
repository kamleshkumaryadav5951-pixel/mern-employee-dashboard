import { useState, useEffect } from 'react';
import { RiUserLine, RiMailLine, RiPhoneLine, RiBriefcaseLine } from 'react-icons/ri';
import Input from '../common/Input';
import Button from '../common/Button';

const DEPARTMENTS = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Product'];
const STATUSES = ['Active', 'Inactive', 'On Leave'];

const initialForm = {
  name: '', email: '', phone: '', department: 'Engineering',
  role: '', status: 'Active', location: '', salary: '',
};

const EmployeeForm = ({ employee, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setForm({
        name: employee.name || '',
        email: employee.email || '',
        phone: employee.phone || '',
        department: employee.department || 'Engineering',
        role: employee.role || '',
        status: employee.status || 'Active',
        location: employee.location || '',
        salary: employee.salary || '',
      });
    } else {
      setForm(initialForm);
    }
    setErrors({});
  }, [employee]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.role.trim()) errs.role = 'Role is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit({ ...form, salary: form.salary ? Number(form.salary) : 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <Input
            id="emp-name"
            label="Full Name *"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Arjun Sharma"
            icon={RiUserLine}
            error={errors.name}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Input
            id="emp-email"
            label="Email Address *"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="name@company.com"
            icon={RiMailLine}
            error={errors.email}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Input
            id="emp-phone"
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91-9876543210"
            icon={RiPhoneLine}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Input
            id="emp-role"
            label="Job Role *"
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="e.g. Senior Developer"
            icon={RiBriefcaseLine}
            error={errors.role}
          />
        </div>

        {/* Department */}
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="emp-dept" className="form-label">Department *</label>
          <select
            id="emp-dept"
            name="department"
            value={form.department}
            onChange={handleChange}
            className="form-input"
          >
            {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        {/* Status */}
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="emp-status" className="form-label">Status</label>
          <select
            id="emp-status"
            name="status"
            value={form.status}
            onChange={handleChange}
            className="form-input"
          >
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <Input
            id="emp-location"
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Bangalore"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Input
            id="emp-salary"
            label="Salary (₹/month)"
            name="salary"
            type="number"
            value={form.salary}
            onChange={handleChange}
            placeholder="e.g. 80000"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={loading} className="flex-1">
          {employee ? 'Save Changes' : 'Add Employee'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EmployeeForm;
