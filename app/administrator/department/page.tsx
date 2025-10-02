"use client";

import React, { useState, useEffect } from "react";
import { Bell, FileText, Plus, Edit2, Trash2 } from "lucide-react";

interface Branch {
  id: number;
  name: string;
}
interface Division {
  id: number;
  name: string;
  branchId: number;
}

interface Department {
  id: number;
  name: string;
  branchId: number;
  branch: Branch;
  divisionId: number;
  division: Division;
  status: "Active" | "Inactive";
}

export default function DepartmentPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [filterBranchId, setFilterBranchId] = useState("All Branch");
  const [filterDivisionId, setFilterDivisionId] = useState("All Division");

  // Modal state
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [formName, setFormName] = useState("");
  const [formBranchId, setFormBranchId] = useState<number | "">("");
  const [formDivisionId, setFormDivisionId] = useState<number | "">("");
  const [formStatus, setFormStatus] = useState<"Active" | "Inactive">("Active");

  const API_URL = "http://localhost:3000/api/departments";

  // 🔹 Fetch Data Master
  const fetchDataMaster = async () => {
    try {
      const [branchRes, divRes] = await Promise.all([
        fetch("http://localhost:3000/api/branches"),
        fetch("http://localhost:3000/api/divisions"),
      ]);

      if (branchRes.ok) setBranches(await branchRes.json());
      if (divRes.ok) setDivisions(await divRes.json());
    } catch (error) {
      console.error("Failed to fetch master data:", error);
    }
  };

  // 🔹 Fetch Departments (READ)
  const fetchDepartments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setDepartments(
          data.map((d: any) => ({
            ...d,
            status: d.status as "Active" | "Inactive",
          }))
        );
      }
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataMaster();
    fetchDepartments();
  }, []);

  // 🔹 Save Data (CREATE/UPDATE)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formName ||
      !formStatus ||
      formBranchId === "" ||
      formDivisionId === ""
    ) {
      alert("Semua field wajib diisi.");
      return;
    }

    const method = editingDept ? "PUT" : "POST";
    const url = editingDept ? `${API_URL}/${editingDept.id}` : API_URL;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          status: formStatus,
          branchId: formBranchId,
          divisionId: formDivisionId,
        }),
      });

      if (response.ok) {
        alert(`Department berhasil di${editingDept ? "update" : "tambah"}!`);
        fetchDepartments();
        setModalOpen(false);
      } else {
        const errorData = await response.json();
        alert(`Gagal menyimpan department: ${errorData.error}`);
      }
    } catch (error) {
      alert("Terjadi kesalahan saat berkomunikasi dengan server.");
    }
  };

  // 🔹 Delete Data (DELETE)
  const handleDelete = async (id: number) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus Department ini?"))
      return;

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (response.ok) {
        alert("Department berhasil dihapus!");
        fetchDepartments();
      } else {
        const errorData = await response.json();
        alert(`Gagal menghapus department: ${errorData.error}`);
      }
    } catch (error) {
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  // Filtered Divisions based on selected Branch in MODAL
  const modalDivisions = divisions.filter(
    (div) => div.branchId === formBranchId
  );

  // Modal handlers
  const openAddModal = () => {
    setEditingDept(null);
    setFormName("");
    setFormBranchId(branches.length > 0 ? branches[0].id : "");
    setFormDivisionId("");
    setFormStatus("Active");
    setModalOpen(true);
  };

  const openEditModal = (dept: Department) => {
    setEditingDept(dept);
    setFormName(dept.name);
    setFormBranchId(dept.branchId);
    setFormDivisionId(dept.divisionId);
    setFormStatus(dept.status);
    setModalOpen(true);
  };

  // Filter logic for TABLE
  const filteredDepartments = departments.filter((dept) => {
    const matchesName = dept.name
      .toLowerCase()
      .includes(filterName.toLowerCase());
    const matchesStatus =
      filterStatus === "All Status" || dept.status === filterStatus;
    const matchesBranch =
      filterBranchId === "All Branch" ||
      dept.branchId === parseInt(filterBranchId);
    const matchesDivision =
      filterDivisionId === "All Division" ||
      dept.divisionId === parseInt(filterDivisionId);
    return matchesName && matchesStatus && matchesBranch && matchesDivision;
  });

  const getStatusColor = (status: Department["status"]) => {
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
        <h1 className="text-lg font-medium">Settings / Department</h1>
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
            <h2 className="text-xl font-bold">Department Management</h2>
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              <Plus size={18} />
              Add Data
            </button>
          </div>

          {/* Filters */}
          <div className="p-6 border-b flex flex-wrap gap-4">
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
              value={filterBranchId}
              onChange={(e) => setFilterBranchId(e.target.value)}
              className="px-4 py-2 border rounded"
            >
              <option value="All Branch">All Branch</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
            <select
              value={filterDivisionId}
              onChange={(e) => setFilterDivisionId(e.target.value)}
              className="px-4 py-2 border rounded"
            >
              <option value="All Division">All Division</option>
              {divisions.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border rounded"
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
                    Branch
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase">
                    Division
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
                {filteredDepartments.map((dept) => (
                  <tr key={dept.id} className="hover:bg-gray-50">
                    <td className="px-6 py-6 font-semibold text-gray-900">
                      {dept.name}
                    </td>
                    <td className="px-6 py-6">{dept.branch.name}</td>
                    <td className="px-6 py-6">{dept.division.name}</td>
                    <td className="px-6 py-6">
                      <span
                        className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                          dept.status
                        )}`}
                      >
                        {dept.status}
                      </span>
                    </td>
                    <td className="px-6 py-6 flex gap-2">
                      <button
                        onClick={() => openEditModal(dept)}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(dept.id)}
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredDepartments.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No departments found
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
              {editingDept ? "Edit Department" : "Add Department"}
            </h2>

            {/* Name */}
            <label htmlFor="deptName" className="block text-sm font-medium">
              Name(*)
            </label>
            <input
              id="deptName"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1 mb-3"
              placeholder="Enter department name"
              required
            />

            {/* Branch */}
            <label htmlFor="deptBranch" className="block text-sm font-medium">
              Branch(*)
            </label>
            <select
              id="deptBranch"
              value={formBranchId}
              onChange={(e) => {
                const newBranchId = parseInt(e.target.value);
                setFormBranchId(newBranchId);
                setFormDivisionId(""); // Reset Division saat Branch berubah
              }}
              className="w-full border rounded px-3 py-2 mt-1 mb-3"
              required
            >
              <option value="" disabled>
                -- Select Branch --
              </option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>

            {/* Division */}
            <label htmlFor="deptDivision" className="block text-sm font-medium">
              Division(*)
            </label>
            <select
              id="deptDivision"
              value={formDivisionId}
              onChange={(e) => setFormDivisionId(parseInt(e.target.value))}
              className="w-full border rounded px-3 py-2 mt-1 mb-3"
              required
              disabled={formBranchId === ""}
            >
              <option value="" disabled>
                -- Select Division --
              </option>
              {modalDivisions.map((div) => (
                <option key={div.id} value={div.id}>
                  {div.name}
                </option>
              ))}
            </select>

            {/* Status */}
            <label htmlFor="deptStatus" className="block text-sm font-medium">
              Status(*)
            </label>
            <select
              id="deptStatus"
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
