"use client";

import React, { useState, useEffect } from "react";
import { Bell, FileText, Plus, Edit2, Trash2 } from "lucide-react";

interface EmployeeStatus {
  id: number;
  name: string;
  status: "Active" | "Inactive";
}

export default function EmployeeStatusPage() {
  const [statuses, setStatuses] = useState<EmployeeStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Status");

  // Modal state
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingStatus, setEditingStatus] = useState<EmployeeStatus | null>(
    null
  );
  const [formName, setFormName] = useState("");
  const [formStatus, setFormStatus] = useState<"Active" | "Inactive">("Active");

  const API_URL = "http://localhost:3000/api/employee-statuses";

  // 🔹 Fetch Data (READ)
  const fetchStatuses = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setStatuses(
          data.map((s: any) => ({
            ...s,
            status: s.status as "Active" | "Inactive",
          }))
        );
      }
    } catch (error) {
      console.error("Failed to fetch employee statuses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  // 🔹 Save Data (CREATE/UPDATE)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formStatus) {
      alert("Nama dan Status wajib diisi.");
      return;
    }

    const method = editingStatus ? "PUT" : "POST";
    const url = editingStatus ? `${API_URL}/${editingStatus.id}` : API_URL;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName, status: formStatus }),
      });

      if (response.ok) {
        alert(
          `Employee Status berhasil di${editingStatus ? "update" : "tambah"}!`
        );
        fetchStatuses();
        setModalOpen(false);
      } else {
        const errorData = await response.json();
        alert(`Gagal menyimpan Employee Status: ${errorData.error}`);
      }
    } catch (error) {
      alert("Terjadi kesalahan saat berkomunikasi dengan server.");
    }
  };

  // 🔹 Delete Data (DELETE)
  const handleDelete = async (id: number) => {
    if (
      !window.confirm("Apakah Anda yakin ingin menghapus Employee Status ini?")
    )
      return;

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (response.ok) {
        alert("Employee Status berhasil dihapus!");
        fetchStatuses();
      } else {
        const errorData = await response.json();
        alert(`Gagal menghapus Employee Status: ${errorData.error}`);
      }
    } catch (error) {
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  // Filter logic
  const filteredStatuses = statuses.filter((s) => {
    const matchesName = s.name.toLowerCase().includes(filterName.toLowerCase());
    const matchesStatus =
      filterStatus === "All Status" || s.status === filterStatus;
    return matchesName && matchesStatus;
  });

  const getStatusColor = (status: EmployeeStatus["status"]) =>
    status === "Active" ? "bg-green-500 text-white" : "bg-red-400 text-white";

  const openAddModal = () => {
    setEditingStatus(null);
    setFormName("");
    setFormStatus("Active");
    setModalOpen(true);
  };

  const openEditModal = (status: EmployeeStatus) => {
    setEditingStatus(status);
    setFormName(status.name);
    setFormStatus(status.status);
    setModalOpen(true);
  };

  if (isLoading) {
    return <div className="p-6 text-center text-gray-700">Loading data...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-medium">Settings / Employee Status</h1>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-blue-700 rounded">
            <Bell size={20} />
          </button>
          <button className="p-2 hover:bg-blue-700 rounded">
            <FileText size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Title and Add Button */}
          <div className="p-6 flex items-center justify-between border-b">
            <h2 className="text-xl font-bold">Employee Status Management</h2>
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              <Plus size={18} />
              Add Data
            </button>
          </div>

          {/* Filters */}
          <div className="p-6 border-b flex gap-4">
            <div className="flex-1 max-w-xs relative">
              <input
                type="text"
                placeholder="Filter by name"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">
                {filterName.length}/50
              </div>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStatuses.map((status) => (
                  <tr key={status.id} className="hover:bg-gray-50">
                    <td className="px-6 py-6 font-semibold text-gray-900">
                      {status.name}
                    </td>
                    <td className="px-6 py-6">
                      <span
                        className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                          status.status
                        )}`}
                      >
                        {status.status}
                      </span>
                    </td>
                    <td className="px-6 py-6 flex gap-2">
                      <button
                        onClick={() => openEditModal(status)}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(status.id)}
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredStatuses.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No employee statuses found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form
            onSubmit={handleSave}
            className="bg-white w-[400px] rounded-lg shadow-lg p-6"
          >
            <h2 className="text-lg font-semibold mb-4">
              {editingStatus ? "Edit Employee Status" : "Add Employee Status"}
            </h2>

            {/* Name */}
            <label htmlFor="statusName" className="block text-sm font-medium">
              Name(*)
            </label>
            <input
              id="statusName"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1 mb-3"
              placeholder="Enter employee status name"
              required
            />

            {/* Status */}
            <label htmlFor="statusStatus" className="block text-sm font-medium">
              Status(*)
            </label>
            <select
              id="statusStatus"
              value={formStatus}
              onChange={(e) =>
                setFormStatus(e.target.value as "Active" | "Inactive")
              }
              className="w-full border rounded px-3 py-2 mt-1 mb-4"
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
