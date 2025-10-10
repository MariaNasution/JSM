"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Users, Bell, FileText } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";

interface MasterData {
  id: number;
  name: string;
  [key: string]: any;
}

interface EmployeeData {
  firstName: string;
  lastName: string;
  placeOfBirth: string;
  birthdate: string;
  gender: string;
  religion: string;
  maritalStatus: string;
  bloodType: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  employeeId: string;
  division: string;
  department: string;
  unit: string;
  jobLevel: string;
  employeeStatus: string;
  joinDate: string;
  signDate: string;
  endEmploymentStatusDate: string;
  username: string;
  password: string;
  role: string;
}

export default function AddEmployee() {
  const [step, setStep] = useState(1);
  const [employeeData, setEmployeeData] = useState<EmployeeData>({
    firstName: "",
    lastName: "",
    placeOfBirth: "",
    birthdate: "",
    gender: "",
    religion: "",
    maritalStatus: "",
    bloodType: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    employeeId: "",
    division: "",
    department: "",
    unit: "",
    jobLevel: "",
    employeeStatus: "",
    joinDate: "",
    signDate: "",
    endEmploymentStatusDate: "",
    username: "",
    password: "",
    role: "Learner",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🔹 State untuk Data Master
  const [masterData, setMasterData] = useState<{ [key: string]: MasterData[] }>(
    {
      branches: [],
      divisions: [],
      departments: [],
      units: [],
      jobLevels: [],
      employeeStatuses: [],
      employeeTypes: [],
    }
  );
  const [isMasterLoading, setIsMasterLoading] = useState(true);

  // 🔹 Fetch semua data master yang diperlukan
  useEffect(() => {
    const fetchMasterData = async () => {
      setIsMasterLoading(true);
      const endpoints = {
        branches: "api/branches",
        divisions: "api/divisions",
        departments: "api/departments",
        units: "api/units",
        jobLevels: "api/job-levels",
        employeeStatuses: "api/employee-statuses",
      };

      const promises = Object.entries(endpoints).map(([key, endpoint]) =>
        fetch(`http://localhost:3000/${endpoint}`).then((res) =>
          res.json().catch(() => [])
        )
      );

      const results = await Promise.all(promises);
      const newMasterData: { [key: string]: MasterData[] } = {};
      Object.keys(endpoints).forEach((key, index) => {
        newMasterData[key] = results[index].map((item: any) => ({
          id: item.id,
          name: item.name,
          branchId: item.branchId,
          divisionId: item.divisionId,
          departmentId: item.departmentId,
        }));
      });
      setMasterData(newMasterData);
      setIsMasterLoading(false);
    };
    fetchMasterData();
  }, []);

  // 🔹 Filtering Data Master (Cascading Logic)
  const filteredDivisions = useMemo(() => {
    const selectedBranch = masterData.branches.find(
      (b) => b.name === employeeData.companyName
    );
    if (!selectedBranch) return [];
    return masterData.divisions.filter((d) => d.branchId === selectedBranch.id);
  }, [employeeData.companyName, masterData.divisions, masterData.branches]);

  const filteredDepartments = useMemo(() => {
    const selectedDivision = masterData.divisions.find(
      (d) => d.name === employeeData.division
    );
    if (!selectedDivision) return [];
    return masterData.departments.filter(
      (d) => d.divisionId === selectedDivision.id
    );
  }, [employeeData.division, masterData.departments, masterData.divisions]);

  const filteredUnits = useMemo(() => {
    const selectedDepartment = masterData.departments.find(
      (d) => d.name === employeeData.department
    );
    if (!selectedDepartment) return [];
    return masterData.units.filter(
      (u) => u.departmentId === selectedDepartment.id
    );
  }, [employeeData.department, masterData.units, masterData.departments]);

  // 🔹 Handle Change + Automatic Defaulting Logic
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setEmployeeData((prevData) => {
      const newData = { ...prevData, [name]: value };

      // 1. Automatic Username/Password Defaulting
      if (name === "email") {
        newData.username = value;
      }
      if (name === "phoneNumber") {
        newData.password = value;
      }

      // 2. Clear subsequent fields when a parent selection changes
      if (name === "companyName") {
        newData.division = "";
        newData.department = "";
        newData.unit = "";
      } else if (name === "division") {
        newData.department = "";
        newData.unit = "";
      } else if (name === "department") {
        newData.unit = "";
      }

      return newData;
    });
  };

  // 🔹 Multi-step handlers
  const nextStep = () => {
    if (step === 1) {
      if (
        !employeeData.firstName ||
        !employeeData.lastName ||
        !employeeData.email ||
        !employeeData.phoneNumber ||
        !employeeData.placeOfBirth ||
        !employeeData.birthdate ||
        !employeeData.gender ||
        !employeeData.religion ||
        !employeeData.maritalStatus ||
        !employeeData.bloodType
      ) {
        alert("Harap isi semua field wajib Personal Data (*).");
        return;
      }
    }
    if (step === 2) {
      if (
        !employeeData.companyName ||
        !employeeData.division ||
        !employeeData.department ||
        !employeeData.jobLevel ||
        !employeeData.employeeStatus
      ) {
        alert("Harap isi semua field wajib Employment Data (*).");
        return;
      }
    }
    setStep((prev) => prev + 1);
  };
  const prevStep = () => setStep((prev) => prev - 1);

  // 🔹 Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Final check for step 3 (Account Data)
    if (
      !employeeData.username ||
      !employeeData.password ||
      !employeeData.role
    ) {
      alert("Harap isi semua field Account data (*).");
      setLoading(false);
      setStep(3);
      return;
    }

    // Pastikan username/password dikirim dengan nilai default jika kosong
    const dataToSend = {
      ...employeeData,
      username: employeeData.username || employeeData.email,
      password: employeeData.password || employeeData.phoneNumber,
      status: employeeData.employeeStatus,
    };

    try {
      const response = await fetch("http://localhost:3000/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        await Swal.fire({
          title: "Success!",
          text: "Employee added successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });

        router.push("/administrator/employee");
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: "Error",
          text: `Error adding employee: ${errorData.error}`,
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong while adding employee.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isMasterLoading) {
    return <div className="p-6 text-center">Loading Master Data...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="bg-blue-700 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={20} />
              <div className="flex items-center gap-2 text-sm">
                <Link
                  href="/administrator/employee"
                  className="hover:underline"
                >
                  Employee
                </Link>
                <span>/</span>
                <span>Add Employee</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" className="p-2 hover:bg-blue-600 rounded">
                <Bell size={20} />
              </button>
              <button type="button" className="p-2 hover:bg-blue-600 rounded">
                <FileText size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Step Indicator */}
            <div className="flex items-center gap-6 mb-6">
              {["Personal Data", "Employment Data", "Account"].map(
                (label, idx) => (
                  <div
                    key={label}
                    className={`flex items-center gap-2 ${
                      step === idx + 1
                        ? "text-blue-600 font-bold"
                        : "text-gray-500"
                    }`}
                  >
                    <span className="w-7 h-7 flex items-center justify-center rounded-full border-2 border-blue-600">
                      {idx + 1}
                    </span>
                    <span>{label}</span>
                  </div>
                )
              )}
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Data */}
              {step === 1 && (
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-4">Personal Data</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {/* First Name */}
                    <label>
                      First Name (*)
                      <input
                        name="firstName"
                        value={employeeData.firstName}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        required
                      />
                    </label>
                    {/* Last Name */}
                    <label>
                      Last Name (*)
                      <input
                        name="lastName"
                        value={employeeData.lastName}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        required
                      />
                    </label>
                    {/* Place of Birth */}
                    <label>
                      Place of Birth (*)
                      <input
                        name="placeOfBirth"
                        value={employeeData.placeOfBirth}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        required
                      />
                    </label>
                    {/* Birthdate */}
                    <label>
                      Birthdate (*)
                      <input
                        type="date"
                        name="birthdate"
                        value={employeeData.birthdate}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        required
                      />
                    </label>
                    {/* Gender */}
                    <label>
                      Gender (*)
                      <select
                        name="gender"
                        value={employeeData.gender}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        required
                      >
                        <option value="">Select Gender</option>{" "}
                        <option value="Male">Male</option>{" "}
                        <option value="Female">Female</option>
                      </select>
                    </label>
                    {/* Religion */}
                    <label>
                      Religion (*)
                      <select
                        name="religion"
                        value={employeeData.religion}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        required
                      >
                        <option value="">Select Religion</option>{" "}
                        <option value="Islam">Islam</option>{" "}
                        <option value="Christian">Christian</option>{" "}
                        <option value="Hindu">Hindu</option>
                      </select>
                    </label>
                    {/* Marital Status */}
                    <label>
                      Marital Status (*)
                      <select
                        name="maritalStatus"
                        value={employeeData.maritalStatus}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        required
                      >
                        <option value="">Select Status</option>{" "}
                        <option value="Single">Single</option>{" "}
                        <option value="Married">Married</option>
                      </select>
                    </label>
                    {/* Blood Type */}
                    <label>
                      Blood Type (*)
                      <select
                        name="bloodType"
                        value={employeeData.bloodType}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        required
                      >
                        <option value="">Select Type</option>{" "}
                        <option value="A">A</option>{" "}
                        <option value="B">B</option>{" "}
                        <option value="O">O</option>{" "}
                        <option value="AB">AB</option>
                      </select>
                    </label>
                    {/* Email */}
                    <div className="col-span-2">
                      <label>
                        Email (*)
                        <input
                          name="email"
                          type="email"
                          value={employeeData.email}
                          onChange={handleChange}
                          className="border p-2 rounded w-full"
                          required
                        />
                      </label>
                    </div>
                    {/* Phone Number */}
                    <div className="col-span-2">
                      <label>
                        Phone Number (*)
                        <input
                          name="phoneNumber"
                          type="tel"
                          value={employeeData.phoneNumber}
                          onChange={handleChange}
                          className="border p-2 rounded w-full"
                          required
                        />
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => router.push("/administrator/employee")}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Employment Data */}
              {step === 2 && (
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Employment Data
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Company Name (Branch) */}
                    <div className="col-span-2">
                      <label>Company Name (*)</label>
                      <select
                        name="companyName"
                        value={employeeData.companyName}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        required
                      >
                        <option value="">Select Company Branch</option>
                        {masterData.branches.map((b) => (
                          <option key={b.id} value={b.name}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-2">
                      <label>
                        Employee ID
                        <input
                          name="employeeId"
                          value={employeeData.employeeId}
                          onChange={handleChange}
                          className="border p-2 rounded w-full"
                        />
                      </label>
                    </div>

                    {/* Division */}
                    <label>
                      Division (*)
                      <select
                        name="division"
                        value={employeeData.division}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        required
                        disabled={!employeeData.companyName}
                      >
                        <option value="">Select Division</option>
                        {filteredDivisions.map((d) => (
                          <option key={d.id} value={d.name}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    {/* Department */}
                    <label>
                      Department (*)
                      <select
                        name="department"
                        value={employeeData.department}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        required
                        disabled={!employeeData.division}
                      >
                        <option value="">Select Department</option>
                        {filteredDepartments.map((d) => (
                          <option key={d.id} value={d.name}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    {/* Unit */}
                    <label>
                      Unit
                      <select
                        name="unit"
                        value={employeeData.unit}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        disabled={!employeeData.department}
                      >
                        <option value="">Select Unit</option>
                        {filteredUnits.map((u) => (
                          <option key={u.id} value={u.name}>
                            {u.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    {/* Job Level */}
                    <label>
                      Job Level (*)
                      <select
                        name="jobLevel"
                        value={employeeData.jobLevel}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        required
                      >
                        <option value="">Select Job Level</option>
                        {masterData.jobLevels.map((j) => (
                          <option key={j.id} value={j.name}>
                            {j.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    {/* Employee Status */}
                    <label>
                      Employee Status (*)
                      <select
                        name="employeeStatus"
                        value={employeeData.employeeStatus}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        required
                      >
                        <option value="">Select Status</option>
                        {masterData.employeeStatuses.map((e) => (
                          <option key={e.id} value={e.name}>
                            {e.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    {/* Join Date */}
                    <label>
                      Join Date
                      <input
                        name="joinDate"
                        type="date"
                        value={employeeData.joinDate}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      />
                    </label>
                    {/* Sign Date */}
                    <label>
                      Sign Date
                      <input
                        name="signDate"
                        type="date"
                        value={employeeData.signDate}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      />
                    </label>
                    {/* End Employment Status Date */}
                    <label>
                      End Employment Status Date
                      <input
                        name="endEmploymentStatusDate"
                        type="date"
                        value={employeeData.endEmploymentStatusDate}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      />
                    </label>
                  </div>
                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Account Data */}
              {step === 3 && (
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-4">Account</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Username */}
                    <div className="col-span-2">
                      <label>Username (*)</label>
                      <input
                        type="text"
                        name="username"
                        value={employeeData.username}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Default: Menggunakan Email
                      </p>
                    </div>
                    {/* Password */}
                    <div className="col-span-2">
                      <label>Password (*)</label>
                      <input
                        type="text"
                        name="password"
                        value={employeeData.password}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Default: Menggunakan Phone Number
                      </p>
                    </div>
                    {/* Role */}
                    <div className="col-span-2">
                      <label>Role (*)</label>
                      <select
                        name="role"
                        value={employeeData.role}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        required
                      >
                        <option value="Learner">Learner</option>
                        <option value="Trainer">Trainer</option>
                        <option value="Administrator">Administrator</option>
                        <option value="Super Admin">Super Admin</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
