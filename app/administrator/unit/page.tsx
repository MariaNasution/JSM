"use client";

import React, { useState } from "react";
import { Bell, FileText, Plus, Edit2 } from "lucide-react";

interface Unit {
  id: number;
  name: string;
  branch: string;
  division: string;
  department: string;
  status: "Active" | "Inactive";
}

export default function UnitPage() {
  const [units, setUnits] = useState<Unit[]>([
    { id: 1, name: "Frontend Team", branch: "Jakarta Office", division: "IT Division", department: "Software Development", status: "Active" },
    { id: 2, name: "Backend Team", branch: "Jakarta Office", division: "IT Division", department: "Software Development", status: "Active" },
  ]);

  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [filterBranch, setFilterBranch] = useState("All Branch");
  const [filterDivision, setFilterDivision] = useState("All Division");
  const [filterDepartment, setFilterDepartment] = useState("All Department");

  // Modal state
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const [formName, setFormName] = useState("");
  const [formBranch, setFormBranch] = useState("");
  const [formDivision, setFormDivision] = useState("");
  const [formDepartment, setFormDepartment] = useState("");
  const [formStatus, setFormStatus] = useState<"Active" | "Inactive">("Active");

  // Filter logic
  const filteredUnits = units.filter((u) => {
    const matchesName = u.name.toLowerCase().includes(filterName.toLowerCase());
    const matchesStatus = filterStatus === "All Status" || u.status === filterStatus;
    const matchesBranch = filterBranch === "All Branch" || u.branch === filterBranch;
    const matchesDivision = filterDivision === "All Division" || u.division === filterDivision;
    const matchesDept = filterDepartment === "All Department" || u.department === filterDepartment;
    return matchesName && matchesStatus && matchesBranch && matchesDivision && matchesDept;
  });

  const getStatusColor = (status: Unit["status"]) => {
    return status === "Active" ? "bg-green-500 text-white" : "bg-red-400 text-white";
  };

  const openAddModal = () => {
    setEditingUnit(null);
    setFormName("");
    setFormBranch("");
    setFormDivision("");
    setFormDepartment("");
    setFormStatus("Active");
    setModalOpen(true);
  };

  const openEditModal = (unit: Unit) => {
    setEditingUnit(unit);
    setFormName(unit.name);
    setFormBranch(unit.branch);
    setFormDivision(unit.division);
    setFormDepartment(unit.department);
    setFormStatus(unit.status);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!formName || !formBranch || !formDivision || !formDepartment) {
      alert("Please fill all required fields (*)");
      return;
    }

    if (editingUnit) {
      // Edit existing
      setUnits((prev) =>
        prev.map((u) =>
          u.id === editingUnit.id
            ? { ...u, name: formName, branch: formBranch, division: formDivision, department: formDepartment, status: formStatus }
            : u
        )
      );
    } else {
      // Add new
      const newUnit: Unit = {
        id: units.length + 1,
        name: formName,
        branch: formBranch,
        division: formDivision,
        department: formDepartment,
        status: formStatus,
      };
      setUnits((prev) => [...prev, newUnit]);
    }
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-medium">Settings / Unit</h1>
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
          {/* Title and Add */}
          <div className="p-6 flex items-center justify-between border-b">
            <h2 className="text-xl font-bold">Unit Management</h2>
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
            <select value={filterBranch} onChange={(e) => setFilterBranch(e.target.value)} className="px-4 py-2 border rounded">
              <option>All Branch</option>
              <option>Jakarta Office</option>
              <option>Surabaya Office</option>
            </select>
            <select value={filterDivision} onChange={(e) => setFilterDivision(e.target.value)} className="px-4 py-2 border rounded">
              <option>All Division</option>
              <option>IT Division</option>
              <option>HR Division</option>
              <option>Finance Division</option>
            </select>
            <select value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)} className="px-4 py-2 border rounded">
              <option>All Department</option>
              <option>Software Development</option>
              <option>Recruitment</option>
              <option>Accounting</option>
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 border rounded">
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase">Department</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUnits.map((unit) => (
                  <tr key={unit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-6 font-semibold text-gray-900">{unit.name}</td>
                    <td className="px-6 py-6">{unit.branch}</td>
                    <td className="px-6 py-6">{unit.division}</td>
                    <td className="px-6 py-6">{unit.department}</td>
                    <td className="px-6 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(unit.status)}`}>
                        {unit.status}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <button
                        onClick={() => openEditModal(unit)}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        <Edit2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUnits.length === 0 && (
              <div className="text-center py-12 text-gray-500">No units found</div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[400px] rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">{editingUnit ? "Edit Unit" : "Add Unit"}</h2>

            {/* Name */}
            <label className="block text-sm font-medium">Name(*)</label>
            <input
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1 mb-3"
              placeholder="Enter unit name"
            />

            {/* Branch */}
            <label className="block text-sm font-medium">Branch(*)</label>
            <select value={formBranch} onChange={(e) => setFormBranch(e.target.value)} className="w-full border rounded px-3 py-2 mt-1 mb-3">
              <option value="">-- Select Branch --</option>
              <option value="Jakarta Office">Jakarta Office</option>
              <option value="Surabaya Office">Surabaya Office</option>
            </select>

            {/* Division */}
            <label className="block text-sm font-medium">Division(*)</label>
            <select value={formDivision} onChange={(e) => setFormDivision(e.target.value)} className="w-full border rounded px-3 py-2 mt-1 mb-3">
              <option value="">-- Select Division --</option>
              <option value="IT Division">IT Division</option>
              <option value="HR Division">HR Division</option>
              <option value="Finance Division">Finance Division</option>
            </select>

            {/* Department */}
            <label className="block text-sm font-medium">Department(*)</label>
            <select value={formDepartment} onChange={(e) => setFormDepartment(e.target.value)} className="w-full border rounded px-3 py-2 mt-1 mb-3">
              <option value="">-- Select Department --</option>
              <option value="Software Development">Software Development</option>
              <option value="Recruitment">Recruitment</option>
              <option value="Accounting">Accounting</option>
            </select>

            {/* Status */}
            <label className="block text-sm font-medium">Status(*)</label>
            <select value={formStatus} onChange={(e) => setFormStatus(e.target.value as "Active" | "Inactive")} className="w-full border rounded px-3 py-2 mt-1 mb-4">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button onClick={() => setModalOpen(false)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Cancel
              </button>
              <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
