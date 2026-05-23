import { useState } from 'react';
import { RiEditLine, RiDeleteBinLine, RiMailLine, RiPhoneLine } from 'react-icons/ri';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import { getStatusColor, formatDate } from '../../utils/helpers';

const EmployeeTable = ({ employees = [], onEdit, onDelete, loading }) => {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left py-3.5 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                Employee
              </th>
              <th className="text-left py-3.5 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider hidden md:table-cell">
                Department
              </th>
              <th className="text-left py-3.5 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider hidden lg:table-cell">
                Role
              </th>
              <th className="text-left py-3.5 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-3.5 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider hidden xl:table-cell">
                Joined
              </th>
              <th className="text-right py-3.5 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {employees.map((emp) => (
              <tr key={emp._id} className="table-row">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={emp.name} size="sm" />
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-800 truncate">{emp.name}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 truncate">
                        <RiMailLine size={11} />
                        {emp.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 hidden md:table-cell">
                  <span className="text-gray-600 text-sm">{emp.department}</span>
                </td>
                <td className="py-3.5 px-4 hidden lg:table-cell">
                  <span className="text-gray-600 text-sm">{emp.role}</span>
                </td>
                <td className="py-3.5 px-4">
                  <span className={`badge ${getStatusColor(emp.status)}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      emp.status === 'Active' ? 'bg-emerald-500' :
                      emp.status === 'On Leave' ? 'bg-amber-500' : 'bg-gray-400'
                    }`} />
                    {emp.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 hidden xl:table-cell">
                  <span className="text-gray-500 text-xs">{formatDate(emp.joinDate)}</span>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onEdit(emp)}
                      className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors"
                      title="Edit employee"
                    >
                      <RiEditLine size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(emp)}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                      title="Delete employee"
                    >
                      <RiDeleteBinLine size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {employees.length === 0 && !loading && (
              <tr>
                <td colSpan={6} className="text-center py-16 text-gray-400">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl">👥</span>
                    <p className="font-medium">No employees found</p>
                    <p className="text-sm">Add your first employee to get started</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
