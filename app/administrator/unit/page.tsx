"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Bell, FileText, Plus, Edit2, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

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
  divisionId: number;
}

interface Unit {
  id: number;
  name: string;
  branchId: number;
  branch: Branch;
  divisionId: number;
  division: Division;
  departmentId: number;
  department: Department;
  status: "Active" | "Inactive";
}

export default function UnitPage() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [filterBranchId, setFilterBranchId] = useState("All Branch");
  const [filterDivisionId, setFilterDivisionId] = useState("All Division");
  const [filterDepartmentId, setFilterDepartmentId] =
    useState("All Department");

  // Modal state
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const [formName, setFormName] = useState("");
  const [formBranchId, setFormBranchId] = useState<number | "">("");
  const [formDivisionId, setFormDivisionId] = useState<number | "">("");
  const [formDepartmentId, setFormDepartmentId] = useState<number | "">("");
  const [formStatus, setFormStatus] = useState<"Active" | "Inactive">("Active");

  const API_URL = "http://localhost:3000/api/units";

  // 🔹 Fetch Data Master
  const fetchDataMaster = async () => {
    try {
      const [branchRes, divRes, deptRes] = await Promise.all([
        fetch("http://localhost:3000/api/branches"),
        fetch("http://localhost:3000/api/divisions"),
        fetch("http://localhost:3000/api/departments"),
      ]);

      if (branchRes.ok) setBranches(await branchRes.json());
      if (divRes.ok) setDivisions(await divRes.json());
      if (deptRes.ok) setDepartments(await deptRes.json());
    } catch (error) {
      console.error("Failed to fetch master data:", error);
    }
  };

  // 🔹 Fetch Units (READ)
  const fetchUnits = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setUnits(
          data.map((u: any) => ({
            ...u,
            status: u.status as "Active" | "Inactive",
          }))
        );
      }
    } catch (error) {
      console.error("Failed to fetch units:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataMaster();
    fetchUnits();
  }, []);

  // 🔹 Save Data (CREATE/UPDATE)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Input validation
    if (
      !formName ||
      !formStatus ||
      formBranchId === "" ||
      formDivisionId === "" ||
      formDepartmentId === ""
    ) {
      await Swal.fire({
        title: "Warning!",
        text: "All fields are required.",
        icon: "warning",
        confirmButtonColor: "#f59e0b",
      });
      return;
    }

    // Confirmation before save
    const confirmResult = await Swal.fire({
      title: editingUnit ? "Update Unit?" : "Add New Unit?",
      text: editingUnit
        ? "Are you sure you want to update this unit?"
        : "Are you sure you want to add a new unit?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: editingUnit ? "Yes, update!" : "Yes, add!",
      cancelButtonText: "Cancel",
    });

    if (!confirmResult.isConfirmed) return;

    const method = editingUnit ? "PUT" : "POST";
    const url = editingUnit ? `${API_URL}/${editingUnit.id}` : API_URL;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          status: formStatus,
          branchId: formBranchId,
          divisionId: formDivisionId,
          departmentId: formDepartmentId,
        }),
      });

      if (response.ok) {
        await Swal.fire({
          title: "Success!",
          text: `Unit successfully ${editingUnit ? "updated" : "added"}!`,
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        fetchUnits();
        setModalOpen(false);
      } else {
        const errorData = await response.json();
        await Swal.fire({
          title: "Error!",
          text: `Failed to save unit: ${errorData.error}`,
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      await Swal.fire({
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
      title: "Are you sure you want to delete this Unit?",
      text: "Deleted data cannot be recovered!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (response.status === 204) {
        await Swal.fire({
          title: "Deleted!",
          text: "Unit has been successfully deleted!",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        fetchUnits();
      } else {
        const errorData = await response.json();
        await Swal.fire({
          title: "Error!",
          text: `Failed to delete unit: ${errorData.error}`,
          icon: "error",
          confirmButtonColor: "#d33",
        });
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


  // Filtered lists for MODAL
  const modalDivisions = divisions.filter(
    (div) => div.branchId === formBranchId
  );
  const modalDepartments = departments.filter(
    (dept) => dept.divisionId === formDivisionId
  );

  // Modal handlers
  const openAddModal = () => {
    setEditingUnit(null);
    setFormName("");
    setFormBranchId(branches.length > 0 ? branches[0].id : "");
    setFormDivisionId("");
    setFormDepartmentId("");
    setFormStatus("Active");
    setModalOpen(true);
  };

  const openEditModal = (unit: Unit) => {
    setEditingUnit(unit);
    setFormName(unit.name);
    setFormBranchId(unit.branchId);
    setFormDivisionId(unit.divisionId);
    setFormDepartmentId(unit.departmentId);
    setFormStatus(unit.status);
    setModalOpen(true);
  };

  // Filter logic for TABLE
  const filteredUnits = units.filter((u) => {
    const matchesName = u.name.toLowerCase().includes(filterName.toLowerCase());
    const matchesStatus =
      filterStatus === "All Status" || u.status === filterStatus;
    const matchesBranch =
      filterBranchId === "All Branch" ||
      u.branchId === parseInt(filterBranchId);
    const matchesDivision =
      filterDivisionId === "All Division" ||
      u.divisionId === parseInt(filterDivisionId);
    const matchesDept =
      filterDepartmentId === "All Department" ||
      u.departmentId === parseInt(filterDepartmentId);
    return (
      matchesName &&
      matchesStatus &&
      matchesBranch &&
      matchesDivision &&
      matchesDept
    );
  });

  const getStatusColor = (status: Unit["status"]) => {
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
              value={filterDepartmentId}
              onChange={(e) => setFilterDepartmentId(e.target.value)}
              className="px-4 py-2 border rounded"
            >
              <option value="All Department">All Department</option>
              {departments.map((d) => (
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
                    Department
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
                {filteredUnits.map((unit) => (
                  <tr key={unit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-6 font-semibold text-gray-900">
                      {unit.name}
                    </td>
                    <td className="px-6 py-6">{unit.branch.name}</td>
                    <td className="px-6 py-6">{unit.division.name}</td>
                    <td className="px-6 py-6">{unit.department.name}</td>
                    <td className="px-6 py-6">
                      <span
                        className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                          unit.status
                        )}`}
                      >
                        {unit.status}
                      </span>
                    </td>
                    <td className="px-6 py-6 flex gap-2">
                      <button
                        onClick={() => openEditModal(unit)}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(unit.id)}
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUnits.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No units found
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
              {editingUnit ? "Edit Unit" : "Add Unit"}
            </h2>

            {/* Name */}
            <label htmlFor="unitName" className="block text-sm font-medium">
              Name(*)
            </label>
            <input
              id="unitName"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1 mb-3"
              placeholder="Enter unit name"
              required
            />

            {/* Branch */}
            <label htmlFor="unitBranch" className="block text-sm font-medium">
              Branch(*)
            </label>
            <select
              id="unitBranch"
              value={formBranchId}
              onChange={(e) => {
                const newBranchId = parseInt(e.target.value);
                setFormBranchId(newBranchId);
                setFormDivisionId("");
                setFormDepartmentId("");
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
            <label htmlFor="unitDivision" className="block text-sm font-medium">
              Division(*)
            </label>
            <select
              id="unitDivision"
              value={formDivisionId}
              onChange={(e) => {
                const newDivisionId = parseInt(e.target.value);
                setFormDivisionId(newDivisionId);
                setFormDepartmentId("");
              }}
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

            {/* Department */}
            <label
              htmlFor="unitDepartment"
              className="block text-sm font-medium"
            >
              Department(*)
            </label>
            <select
              id="unitDepartment"
              value={formDepartmentId}
              onChange={(e) => setFormDepartmentId(parseInt(e.target.value))}
              className="w-full border rounded px-3 py-2 mt-1 mb-3"
              required
              disabled={formDivisionId === ""}
            >
              <option value="" disabled>
                -- Select Department --
              </option>
              {modalDepartments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>

            {/* Status */}
            <label htmlFor="unitStatus" className="block text-sm font-medium">
              Status(*)
            </label>
            <select
              id="unitStatus"
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
                onClick={handleSave}
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
