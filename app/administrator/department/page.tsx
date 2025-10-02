  "use client";

  import React, { useState } from "react";
  import { Bell, FileText, Plus, Edit2 } from "lucide-react";

  interface Department {
    id: number;
    name: string;
    branch: string;
    division: string;
    status: "Active" | "Inactive";
  }

  export default function DepartmentPage() {
    const [departments, setDepartments] = useState<Department[]>([
      { id: 1, name: "Software Development", branch: "Jakarta Office", division: "IT Division", status: "Active" },
      { id: 2, name: "Recruitment", branch: "Jakarta Office", division: "HR Division", status: "Active" },
      { id: 3, name: "Accounting", branch: "Surabaya Office", division: "Finance Division", status: "Active" },
    ]);

    const [filterName, setFilterName] = useState("");
    const [filterStatus, setFilterStatus] = useState("All Status");
    const [filterBranch, setFilterBranch] = useState("All Branch");
    const [filterDivision, setFilterDivision] = useState("All Division");

    // Modal state
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingDept, setEditingDept] = useState<Department | null>(null);
    const [formName, setFormName] = useState("");
    const [formBranch, setFormBranch] = useState("");
    const [formDivision, setFormDivision] = useState("");
    const [formStatus, setFormStatus] = useState<"Active" | "Inactive">("Active");

    // Filter logic
    const filteredDepartments = departments.filter((dept) => {
      const matchesName = dept.name.toLowerCase().includes(filterName.toLowerCase());
      const matchesStatus = filterStatus === "All Status" || dept.status === filterStatus;
      const matchesBranch = filterBranch === "All Branch" || dept.branch === filterBranch;
      const matchesDivision = filterDivision === "All Division" || dept.division === filterDivision;
      return matchesName && matchesStatus && matchesBranch && matchesDivision;
    });

    const getStatusColor = (status: Department["status"]) => {
      return status === "Active" ? "bg-green-500 text-white" : "bg-red-400 text-white";
    };

    const openAddModal = () => {
      setEditingDept(null);
      setFormName("");
      setFormBranch("");
      setFormDivision("");
      setFormStatus("Active");
      setModalOpen(true);
    };

    const openEditModal = (dept: Department) => {
      setEditingDept(dept);
      setFormName(dept.name);
      setFormBranch(dept.branch);
      setFormDivision(dept.division);
      setFormStatus(dept.status);
      setModalOpen(true);
    };

    const handleSave = () => {
      if (editingDept) {
        // Edit existing department
        setDepartments((prev) =>
          prev.map((d) =>
            d.id === editingDept.id
              ? { ...d, name: formName, branch: formBranch, division: formDivision, status: formStatus }
              : d
          )
        );
      } else {
        // Add new department
        const newDept: Department = {
          id: departments.length + 1,
          name: formName,
          branch: formBranch,
          division: formDivision,
          status: formStatus,
        };
        setDepartments((prev) => [...prev, newDept]);
      }
      setModalOpen(false);
    };

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
                value={filterBranch}
                onChange={(e) => setFilterBranch(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded"
              >
                <option>All Branch</option>
                <option>Jakarta Office</option>
                <option>Surabaya Office</option>
              </select>
              <select
                value={filterDivision}
                onChange={(e) => setFilterDivision(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded"
              >
                <option>All Division</option>
                <option>IT Division</option>
                <option>HR Division</option>
                <option>Finance Division</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded"
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
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase">Branch</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase">Division</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredDepartments.map((dept) => (
                    <tr key={dept.id} className="hover:bg-gray-50">
                      <td className="px-6 py-6 font-semibold text-gray-900">{dept.name}</td>
                      <td className="px-6 py-6">{dept.branch}</td>
                      <td className="px-6 py-6">{dept.division}</td>
                      <td className="px-6 py-6">
                        <span
                          className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(dept.status)}`}
                        >
                          {dept.status}
                        </span>
                      </td>
                      <td className="px-6 py-6">
                        <button
                          onClick={() => openEditModal(dept)}
                          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          <Edit2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredDepartments.length === 0 && (
                <div className="text-center py-12 text-gray-500">No departments found</div>
              )}
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[400px] rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4">
                {editingDept ? "Edit Department" : "Add Department"}
              </h2>

              {/* Name */}
              <label className="block text-sm font-medium">Name(*)</label>
              <input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1 mb-3"
                placeholder="Enter department name"
              />

              {/* Branch */}
              <label className="block text-sm font-medium">Branch(*)</label>
              <select
                value={formBranch}
                onChange={(e) => setFormBranch(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1 mb-3"
              >
                <option value="">-- Select Branch --</option>
                <option value="Jakarta Office">Jakarta Office</option>
                <option value="Surabaya Office">Surabaya Office</option>
              </select>

              {/* Division */}
              <label className="block text-sm font-medium">Division(*)</label>
              <select
                value={formDivision}
                onChange={(e) => setFormDivision(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1 mb-3"
              >
                <option value="">-- Select Division --</option>
                <option value="IT Division">IT Division</option>
                <option value="HR Division">HR Division</option>
                <option value="Finance Division">Finance Division</option>
              </select>

              {/* Status */}
              <label className="block text-sm font-medium">Status(*)</label>
              <select
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value as "Active" | "Inactive")}
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
