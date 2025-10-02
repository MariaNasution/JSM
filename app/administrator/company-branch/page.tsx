"use client";

import React, { useState } from "react";
import { Bell, FileText, Plus, Edit2 } from "lucide-react";

interface Branch {
  id: number;
  name: string;
  status: "Active" | "Inactive";
}

export default function CompanyBranchPage() {
  const [branches, setBranches] = useState<Branch[]>([
    { id: 1, name: "Jakarta Office", status: "Active" },
    { id: 2, name: "Surabaya Office", status: "Active" },
    { id: 3, name: "Bandung Office", status: "Inactive" },
  ]);

  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Status");

  // Modal state
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [formName, setFormName] = useState("");
  const [formStatus, setFormStatus] = useState<"Active" | "Inactive">("Active");

  // Filter logic
  const filteredBranches = branches.filter((branch) => {
    const matchesName = branch.name
      .toLowerCase()
      .includes(filterName.toLowerCase());
    const matchesStatus =
      filterStatus === "All Status" || branch.status === filterStatus;
    return matchesName && matchesStatus;
  });

  const getStatusColor = (status: Branch["status"]) => {
    return status === "Active"
      ? "bg-green-500 text-white"
      : "bg-red-400 text-white";
  };

  const openAddModal = () => {
    setEditingBranch(null);
    setFormName("");
    setFormStatus("Active");
    setModalOpen(true);
  };

  const openEditModal = (branch: Branch) => {
    setEditingBranch(branch);
    setFormName(branch.name);
    setFormStatus(branch.status);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editingBranch) {
      // Edit existing branch
      setBranches((prev) =>
        prev.map((b) =>
          b.id === editingBranch.id ? { ...b, name: formName, status: formStatus } : b
        )
      );
    } else {
      // Add new branch
      const newBranch: Branch = {
        id: branches.length + 1,
        name: formName,
        status: formStatus,
      };
      setBranches((prev) => [...prev, newBranch]);
    }
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-medium">Settings / Company Branch</h1>
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
            <h2 className="text-xl font-bold">Company Branch Management</h2>
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              <Plus size={18} />
              Add Data
            </button>
          </div>

          {/* Filters */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Filter:</span>
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
                {filteredBranches.map((branch) => (
                  <tr key={branch.id} className="hover:bg-gray-50">
                    <td className="px-6 py-6">
                      <span className="font-semibold text-gray-900">
                        {branch.name}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <span
                        className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                          branch.status
                        )}`}
                      >
                        {branch.status}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <button
                        onClick={() => openEditModal(branch)}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        <Edit2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredBranches.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No branches found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[400px] rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">
              {editingBranch ? "Edit Company Branch" : "Add Company Branch"}
            </h2>

            {/* Name */}
            <label className="block text-sm font-medium">Name(*)</label>
            <input
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1 mb-3"
              placeholder="Enter branch name"
            />

            {/* Status */}
            <label className="block text-sm font-medium">Status(*)</label>
            <select
              value={formStatus}
              onChange={(e) =>
                setFormStatus(e.target.value as "Active" | "Inactive")
              }
              className="w-full border rounded px-3 py-2 mt-1 mb-4"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
