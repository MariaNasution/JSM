"use client";

import React, { useState, useEffect } from "react";
import { Bell, FileText, Plus, Edit2, Trash2 } from "lucide-react";
import Swal from "sweetalert2";


interface Branch {
  id: number;
  name: string;
  status: "Active" | "Inactive";
}

export default function CompanyBranchPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Status");

  // Modal state
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [formName, setFormName] = useState("");
  const [formStatus, setFormStatus] = useState<"Active" | "Inactive">("Active");

  const API_URL = "http://localhost:3000/api/branches";

  // 🔹 Fetch Data (READ)
  const fetchBranches = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setBranches(
          data.map((b: any) => ({
            ...b,
            status: b.status as "Active" | "Inactive",
          }))
        );
      }
    } catch (error) {
      console.error("Failed to fetch branches:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  // 🔹 Save Data (CREATE/UPDATE)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formName || !formStatus) {
      Swal.fire({
        title: "Warning!",
        text: "Name and Status are required.",
        icon: "warning",
        confirmButtonColor: "#f59e0b",
      });
      return;
    }

    // Konfirmasi sebelum simpan
    const confirmResult = await Swal.fire({
      title: editingBranch ? "Update Branch?" : "Add New Branch?",
      text: editingBranch
        ? "Are you sure you want to update this branch?"
        : "Are you sure you want to add this new branch?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: editingBranch ? "Yes, update it!" : "Yes, add it!",
      cancelButtonText: "Cancel",
    });

    if (!confirmResult.isConfirmed) return;

    const method = editingBranch ? "PUT" : "POST";
    const url = editingBranch ? `${API_URL}/${editingBranch.id}` : API_URL;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName, status: formStatus }),
      });

      if (response.ok) {
        await Swal.fire({
          title: "Success!",
          text: `Branch succesfully ${editingBranch ? "updated" : "added"}!`,
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        fetchBranches();
        setModalOpen(false);
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: "Error!",
          text: `Failed to save branch: ${errorData.error}`,
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while communicating with the server.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };


  // 🔹 Delete Data (DELETE)
  const handleDelete = async (id: number) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "Deleting a branch may break relations with Division, Department, and Unit.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      if (response.status === 204) {
        await Swal.fire({
          title: "Deleted!",
          text: "Branch has been successfully deleted!",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        fetchBranches();
      } else {
        const errorData = await response.json();
        if (errorData.error && errorData.error.includes("P2003")) {
          await Swal.fire({
            title: "Cannot Delete!",
            text: "This branch still has active relations (Division, Department, or Unit). Delete those relations first.",
            icon: "warning",
            confirmButtonColor: "#f59e0b",
          });
        } else {
          await Swal.fire({
            title: "Error!",
            text: `Failed to delete branch: ${errorData.error}`,
            icon: "error",
            confirmButtonColor: "#d33",
          });
        }
      }
    } catch (error) {
      await Swal.fire({
        title: "Error!",
        text: "An error occurred while deleting the data.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };


  // Modal handlers
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

  if (isLoading) {
    return <div className="p-6 text-center text-gray-700">Loading data...</div>;
  }

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
                    <td className="px-6 py-6 flex gap-2">
                      <button
                        onClick={() => openEditModal(branch)}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(branch.id)}
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <Trash2 size={18} />
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
          <form
            onSubmit={handleSave}
            className="bg-white w-[400px] rounded-lg shadow-lg p-6"
          >
            <h2 className="text-lg font-semibold mb-4">
              {editingBranch ? "Edit Company Branch" : "Add Company Branch"}
            </h2>

            {/* Name */}
            <label htmlFor="branchName" className="block text-sm font-medium">
              Name(*)
            </label>
            <input
              id="branchName"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1 mb-3"
              placeholder="Enter branch name"
              required
            />

            {/* Status */}
            <label htmlFor="branchStatus" className="block text-sm font-medium">
              Status(*)
            </label>
            <select
              id="branchStatus"
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
