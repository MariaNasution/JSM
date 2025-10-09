"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Bell,
  FileText,
  Plus,
  Download,
  Upload,
  Edit2,
  Trash2,
  Eye,
  X,
} from "lucide-react";
import Link from "next/link";

interface Employee {
  id: number;
  name: string;
  division: string;
  department: string;
  jobLevel: string;
  joinDate: string;
  status: string;
  role?: string;
}

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // modal state
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/employees");
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      } else {
        console.error("Failed to fetch employees");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedEmployees(employees.map((emp) => emp.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelectEmployee = (id: number) => {
    if (selectedEmployees.includes(id)) {
      setSelectedEmployees(selectedEmployees.filter((empId) => empId !== id));
    } else {
      setSelectedEmployees([...selectedEmployees, id]);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/employees/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          fetchEmployees(); // Refresh
        } else {
          alert("Failed to delete employee.");
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Error deleting employee.");
      }
    }
  };

  const handleExport = () => {
    // Memanggil endpoint backend yang menghasilkan CSV
    window.location.href = "http://localhost:3000/api/employees/export";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Inactive":
        return "bg-red-100 text-red-700";
      case "On Contract":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ketika klik Eye
  const openRoleModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setSelectedRole(employee.role || "Learner");
    setShowRoleModal(true);
  };

  const handleSaveRole = async () => {
    if (!selectedEmployee || !selectedRole) {
      alert("Please select a role.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/employees/${selectedEmployee.id}/role`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: selectedRole }),
        }
      );

      if (response.ok) {
        fetchEmployees();
        setShowRoleModal(false);
        setSelectedEmployee(null);
        setSelectedRole("");
      } else {
        alert("Failed to update role");
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  if (isLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow">
        {/* Header */}
        <div className="bg-blue-700 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={20} />
            <h1 className="text-lg font-medium">Employee / Employee Data</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-blue-600 rounded">
              <Bell size={20} />
            </button>
            <button className="p-2 hover:bg-blue-600 rounded">
              <FileText size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex justify-end gap-3 mb-6">
            <Link
              href="/administrator/employee/import"
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              <Upload size={18} />
              Import
            </Link>
            <Link href="/administrator/employee/add">
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                <Plus size={18} />
                Add Employee
              </button>
            </Link>
            <button
              onClick={handleExport} // 🔹 Memanggil fungsi export
              className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              <Download size={18} />
              Export
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="w-12 px-2 py-2 text-center align-middle">
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={
                        employees.length > 0 &&
                        selectedEmployees.length === employees.length
                      }
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Division
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Department
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Job Level
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Join Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id} className="border-b hover:bg-gray-50">
                    <td className="w-12 px-2 py-2 text-center align-middle">
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={selectedEmployees.includes(emp.id)}
                        onChange={() => handleSelectEmployee(emp.id)}
                      />
                    </td>
                    <td className="px-4 py-3 text-sm">{emp.name}</td>
                    <td className="px-4 py-3 text-sm">{emp.division}</td>
                    <td className="px-4 py-3 text-sm">{emp.department}</td>
                    <td className="px-4 py-3 text-sm">{emp.jobLevel}</td>
                    <td className="px-4 py-3 text-sm">
                      {new Date(emp.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          emp.status
                        )}`}
                      >
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/administrator/employee/${emp.id}`}>
                          <button className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
                            <Edit2 size={16} />
                          </button>
                        </Link>
                        <button
                          className="p-1.5 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
                          onClick={() => openRoleModal(emp)}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200"
                          onClick={() => handleDelete(emp.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Role */}
      {showRoleModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <button
              onClick={() => setShowRoleModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>
            <h2 className="text-lg font-semibold mb-4">
              Assign Role for {selectedEmployee.name}
            </h2>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            >
              <option value="">Select Role</option>
              <option value="Learner">Learner</option>
              <option value="Trainer">Trainer</option>
              <option value="Administrator">Administrator</option>
              <option value="Super Admin">Super Admin</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowRoleModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRole}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 