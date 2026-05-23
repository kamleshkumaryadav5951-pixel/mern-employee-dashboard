import { useState, useEffect, useCallback } from 'react';
import { RiAddLine, RiSearchLine, RiRefreshLine, RiFilterLine } from 'react-icons/ri';
import { employeeService } from '../services/employeeService';
import EmployeeTable from '../components/employees/EmployeeTable';
import EmployeeForm from '../components/employees/EmployeeForm';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import { PageSpinner } from '../components/common/Spinner';
import toast from 'react-hot-toast';

const DEPARTMENTS = ['', 'Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Product'];
const STATUSES = ['', 'Active', 'Inactive', 'On Leave'];

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalCount: 0 });
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  const [modalState, setModalState] = useState({ type: null, employee: null });

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const res = await employeeService.getAll({
        search, department, status, page, limit: 10,
      });
      setEmployees(res.data);
      setPagination(res.pagination);
    } catch {
      toast.error('Failed to load employees');
    } finally {
      setLoading(false);
    }
  }, [search, department, status, page]);

  useEffect(() => {
    const timer = setTimeout(fetchEmployees, 300);
    return () => clearTimeout(timer);
  }, [fetchEmployees]);

  const handleSubmit = async (formData) => {
    setFormLoading(true);
    try {
      if (modalState.type === 'edit') {
        await employeeService.update(modalState.employee._id, formData);
        toast.success('Employee updated successfully');
      } else {
        await employeeService.create(formData);
        toast.success('Employee added successfully');
      }
      setModalState({ type: null, employee: null });
      fetchEmployees();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    setFormLoading(true);
    try {
      await employeeService.delete(modalState.employee._id);
      toast.success('Employee deleted');
      setModalState({ type: null, employee: null });
      fetchEmployees();
    } catch {
      toast.error('Failed to delete employee');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Employees</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {pagination.totalCount} total employee{pagination.totalCount !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            icon={RiRefreshLine}
            onClick={fetchEmployees}
            title="Refresh"
          />
          <Button
            icon={RiAddLine}
            onClick={() => setModalState({ type: 'add', employee: null })}
          >
            Add Employee
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="form-input pl-9"
            id="emp-search"
          />
        </div>
        <select
          value={department}
          onChange={(e) => { setDepartment(e.target.value); setPage(1); }}
          className="form-input sm:w-44"
          id="emp-dept-filter"
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.filter(Boolean).map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="form-input sm:w-36"
          id="emp-status-filter"
        >
          <option value="">All Statuses</option>
          {STATUSES.filter(Boolean).map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      {loading ? <PageSpinner /> : (
        <EmployeeTable
          employees={employees}
          loading={loading}
          onEdit={(emp) => setModalState({ type: 'edit', employee: emp })}
          onDelete={(emp) => setModalState({ type: 'delete', employee: emp })}
        />
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Page {pagination.currentPage} of {pagination.totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={!pagination.hasPrevPage}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={!pagination.hasNextPage}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalState.type === 'add' || modalState.type === 'edit'}
        onClose={() => setModalState({ type: null, employee: null })}
        title={modalState.type === 'edit' ? 'Edit Employee' : 'Add New Employee'}
      >
        <EmployeeForm
          employee={modalState.employee}
          onSubmit={handleSubmit}
          onCancel={() => setModalState({ type: null, employee: null })}
          loading={formLoading}
        />
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal
        isOpen={modalState.type === 'delete'}
        onClose={() => setModalState({ type: null, employee: null })}
        title="Delete Employee"
        size="sm"
      >
        <div className="text-center py-2">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🗑️</span>
          </div>
          <p className="text-gray-700 font-medium mb-1">
            Delete <span className="font-bold">{modalState.employee?.name}</span>?
          </p>
          <p className="text-gray-500 text-sm mb-6">
            This action cannot be undone. All data associated with this employee will be permanently removed.
          </p>
          <div className="flex gap-3">
            <Button
              variant="danger"
              loading={formLoading}
              onClick={handleDelete}
              className="flex-1"
            >
              Yes, Delete
            </Button>
            <Button
              variant="secondary"
              onClick={() => setModalState({ type: null, employee: null })}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Employees;
