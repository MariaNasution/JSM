"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import Link from "next/link";

// 🔹 Definisikan tipe Employee
interface Employee {
  id: number;
  name: string;
  division: string;
  department: string;
  jobLevel: string;
  joinDate: string;
  status: string;
}

export default function EmployeeList() {
  const [employees] = useState<Employee[]>([
    {
      id: 1,
      name: "John Doe",
      division: "IT",
      department: "Development",
      jobLevel: "Senior",
      joinDate: "2020-06-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      division: "Finance",
      department: "Finance",
      jobLevel: "Junior",
      joinDate: "2020-06-15",
      status: "Active",
    },
    {
      id: 3,
      name: "Peter Jones",
      division: "Marketing",
      department: "Digital Marketing",
      jobLevel: "Senior",
      joinDate: "2020-06-15",
      status: "Active",
    },
  ]);

  // 🔹 selectedEmployees sekarang jelas tipe array number
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);

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

  // 🔹 status badge warna
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

  return (
    <div className="h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow">
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
            <button className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
              <Download size={18} />
              Export
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={selectedEmployees.length === employees.length}
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
                    <td className="px-4 py-3">
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
                    <td className="px-4 py-3 text-sm">{emp.joinDate}</td>
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
                        <button className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-1.5 bg-gray-100 text-gray-600 rounded hover:bg-gray-200">
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200">
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
    </div>
  );
}
