"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Bell, FileText } from "lucide-react";
import Link from "next/link";

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
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (response.ok) {
        alert("Employee added successfully!");
        router.push("/administrator/employee");
      } else {
        const errorData = await response.json();
        alert(`Error adding employee: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Error adding employee.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="bg-blue-700 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={20} />
              <div className="flex items-center gap-2 text-sm">
                <Link href="/administrator/employee" className="hover:underline">
                  Employee
                </Link>
                <span>/</span>
                <span>Add Employee</span>
              </div>
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
          <div className="p-8">
            {/* Step Indicator */}
            <div className="flex items-center gap-6 mb-6">
              <div
                className={`flex items-center gap-2 ${
                  step === 1 ? "text-blue-600 font-bold" : "text-gray-500"
                }`}
              >
                <span className="w-7 h-7 flex items-center justify-center rounded-full border-2 border-blue-600">
                  1
                </span>
                <span>Personal Data</span>
              </div>
              <div
                className={`flex items-center gap-2 ${
                  step === 2 ? "text-blue-600 font-bold" : "text-gray-500"
                }`}
              >
                <span className="w-7 h-7 flex items-center justify-center rounded-full border-2 border-blue-600">
                  2
                </span>
                <span>Employment Data</span>
              </div>
              <div
                className={`flex items-center gap-2 ${
                  step === 3 ? "text-blue-600 font-bold" : "text-gray-500"
                }`}
              >
                <span className="w-7 h-7 flex items-center justify-center rounded-full border-2 border-blue-600">
                  3
                </span>
                <span>Account</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1 */}
              {step === 1 && (
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-4">Personal Data</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        name="firstName"
                        value={employeeData.firstName}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        name="lastName"
                        value={employeeData.lastName}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Place of Birth
                      </label>
                      <input
                        name="placeOfBirth"
                        value={employeeData.placeOfBirth}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Birthdate
                      </label>
                      <input
                        type="date"
                        name="birthdate"
                        value={employeeData.birthdate}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={employeeData.gender}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Religion
                      </label>
                      <select
                        name="religion"
                        value={employeeData.religion}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      >
                        <option value="">Select Religion</option>
                        <option value="Islam">Islam</option>
                        <option value="Christian">Christian</option>
                        <option value="Hindu">Hindu</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Marital Status
                      </label>
                      <select
                        name="maritalStatus"
                        value={employeeData.maritalStatus}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      >
                        <option value="">Select Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Blood Type
                      </label>
                      <select
                        name="bloodType"
                        value={employeeData.bloodType}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      >
                        <option value="">Select Blood Type</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="O">O</option>
                        <option value="AB">AB</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={employeeData.email}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        name="phoneNumber"
                        type="tel"
                        value={employeeData.phoneNumber}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      />
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

              {/* Step 2 */}
              {step === 2 && (
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Employment Data
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <input
                        name="companyName"
                        value={employeeData.companyName}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employee ID
                      </label>
                      <input
                        name="employeeId"
                        value={employeeData.employeeId}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Division
                      </label>
                      <select
                        name="division"
                        value={employeeData.division}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      >
                        <option value="">Select Division</option>
                        <option value="Finance">Finance</option>
                        <option value="HR">HR</option>
                        <option value="IT">IT</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Department
                      </label>
                      <select
                        name="department"
                        value={employeeData.department}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      >
                        <option value="">Select Department</option>
                        <option value="Accounting">Accounting</option>
                        <option value="Recruitment">Recruitment</option>
                        <option value="Development">Development</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Unit
                      </label>
                      <select
                        name="unit"
                        value={employeeData.unit}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      >
                        <option value="">Select Unit</option>
                        <option value="Unit A">Unit A</option>
                        <option value="Unit B">Unit B</option>
                        <option value="Unit C">Unit C</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Job Level
                      </label>
                      <select
                        name="jobLevel"
                        value={employeeData.jobLevel}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      >
                        <option value="">Select Job Level</option>
                        <option value="Staff">Staff</option>
                        <option value="Supervisor">Supervisor</option>
                        <option value="Manager">Manager</option>
                        <option value="Director">Director</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employee Status
                      </label>
                      <select
                        name="employeeStatus"
                        value={employeeData.employeeStatus}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="On Contract">On Contract</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Join Date
                      </label>
                      <input
                        type="date"
                        name="joinDate"
                        value={employeeData.joinDate}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sign Date
                      </label>
                      <input
                        type="date"
                        name="signDate"
                        value={employeeData.signDate}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Employment Status Date
                      </label>
                      <input
                        type="date"
                        name="endEmploymentStatusDate"
                        value={employeeData.endEmploymentStatusDate}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      />
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
                      type="button"
                      onClick={nextStep}
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-4">Account</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={employeeData.username}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={employeeData.password}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        required
                      />
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
