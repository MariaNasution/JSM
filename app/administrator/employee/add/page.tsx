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

    // 🔹 Logging data untuk debugging sebelum dikirim
    console.log("Data to be sent:", employeeData);

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
              <button className="p-2 hover:bg-blue-600 rounded">
                <Bell size={20} />
              </button>
              <button className="p-2 hover:bg-blue-600 rounded">
                <FileText size={20} />
              </button>
            </div>
          </div>

          <div className="p-8">
            {/* Progress Step */}
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
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1 */}
              {step === 1 && (
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-4">Personal Data</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      name="firstName"
                      value={employeeData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="border p-2 rounded"
                      required
                    />
                    <input
                      name="lastName"
                      value={employeeData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="border p-2 rounded"
                      required
                    />
                    <input
                      name="placeOfBirth"
                      value={employeeData.placeOfBirth}
                      onChange={handleChange}
                      placeholder="Place Of Birth"
                      className="border p-2 rounded"
                    />
                    <input
                      type="date"
                      name="birthdate"
                      value={employeeData.birthdate}
                      onChange={handleChange}
                      placeholder="Birthdate"
                      className="border p-2 rounded"
                    />
                    <select
                      name="gender"
                      value={employeeData.gender}
                      onChange={handleChange}
                      className="border p-2 rounded"
                    >
                      <option value="">Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <select
                      name="religion"
                      value={employeeData.religion}
                      onChange={handleChange}
                      className="border p-2 rounded"
                    >
                      <option value="">Religion</option>
                      <option value="Islam">Islam</option>
                      <option value="Christian">Christian</option>
                      <option value="Hindu">Hindu</option>
                    </select>
                    <select
                      name="maritalStatus"
                      value={employeeData.maritalStatus}
                      onChange={handleChange}
                      className="border p-2 rounded"
                    >
                      <option value="">Marital Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                    </select>
                    <select
                      name="bloodType"
                      value={employeeData.bloodType}
                      onChange={handleChange}
                      className="border p-2 rounded"
                    >
                      <option value="">Blood Type</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="O">O</option>
                      <option value="AB">AB</option>
                    </select>
                    <input
                      name="email"
                      type="email"
                      value={employeeData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="border p-2 rounded col-span-2"
                    />
                    <input
                      name="phoneNumber"
                      type="tel"
                      value={employeeData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="border p-2 rounded col-span-2"
                    />
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
                    <input
                      name="companyName"
                      value={employeeData.companyName}
                      onChange={handleChange}
                      placeholder="Company Name"
                      className="border p-2 rounded col-span-2"
                    />
                    <input
                      name="employeeId"
                      value={employeeData.employeeId}
                      onChange={handleChange}
                      placeholder="Employee ID"
                      className="border p-2 rounded col-span-2"
                    />
                    <input
                      name="division"
                      value={employeeData.division}
                      onChange={handleChange}
                      placeholder="Division"
                      className="border p-2 rounded"
                      required
                    />
                    <input
                      name="department"
                      value={employeeData.department}
                      onChange={handleChange}
                      placeholder="Department"
                      className="border p-2 rounded"
                      required
                    />
                    <input
                      name="unit"
                      value={employeeData.unit}
                      onChange={handleChange}
                      placeholder="Unit"
                      className="border p-2 rounded"
                    />
                    <input
                      name="jobLevel"
                      value={employeeData.jobLevel}
                      onChange={handleChange}
                      placeholder="Job Level"
                      className="border p-2 rounded"
                      required
                    />
                    <select
                      name="employeeStatus"
                      value={employeeData.employeeStatus}
                      onChange={handleChange}
                      className="border p-2 rounded"
                      required
                    >
                      <option value="">Employee Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="On Contract">On Contract</option>
                    </select>
                    <input
                      type="date"
                      name="joinDate"
                      value={employeeData.joinDate}
                      onChange={handleChange}
                      placeholder="Join Date"
                      className="border p-2 rounded"
                      required
                    />
                    <input
                      type="date"
                      name="signDate"
                      value={employeeData.signDate}
                      onChange={handleChange}
                      placeholder="Sign Date"
                      className="border p-2 rounded"
                    />
                    <input
                      type="date"
                      name="endEmploymentStatusDate"
                      value={employeeData.endEmploymentStatusDate}
                      onChange={handleChange}
                      placeholder="End Employment Status Date"
                      className="border p-2 rounded col-span-2"
                    />
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
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                      disabled={loading}
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
