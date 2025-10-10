"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";
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

function getParamAsString(param: string | string[] | undefined): string {
  if (!param) return "";
  return Array.isArray(param) ? param[0] : param;
}

export default function EditEmployeePage() {
  const router = useRouter();
  const params = useParams();
  const id: string = getParamAsString(params.id);

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
    role: "",
  });
  const [loading, setLoading] = useState(true);

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

  // 🔹 Fetch Data Employee
  useEffect(() => {
    if (id && !isMasterLoading) {
      fetchEmployeeData();
    }
  }, [id, isMasterLoading]);

  const fetchEmployeeData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/employees/${id}`);
      if (response.ok) {
        const data = await response.json();
        setEmployeeData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          placeOfBirth: data.placeOfBirth || "",
          birthdate: data.birthdate
            ? new Date(data.birthdate).toISOString().split("T")[0]
            : "",
          gender: data.gender || "",
          religion: data.religion || "",
          maritalStatus: data.maritalStatus || "",
          bloodType: data.bloodType || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          companyName: data.companyName || "",
          employeeId: data.employeeId || "",
          division: data.division || "",
          department: data.department || "",
          unit: data.unit || "",
          jobLevel: data.jobLevel || "",
          employeeStatus: data.status || "",
          joinDate: data.joinDate
            ? new Date(data.joinDate).toISOString().split("T")[0]
            : "",
          signDate: data.signDate
            ? new Date(data.signDate).toISOString().split("T")[0]
            : "",
          endEmploymentStatusDate: data.endEmploymentStatusDate
            ? new Date(data.endEmploymentStatusDate).toISOString().split("T")[0]
            : "",
          username: data.username || "",
          password: "", // Password selalu kosong saat edit untuk keamanan
          role: data.role || "",
        });
      } else {
        alert("Employee not found.");
        router.push("/administrator/employee");
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
      alert("Failed to load employee data.");
      router.push("/administrator/employee");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Clone object for conditional deletion (TS fix)
    const dataToSend = {
      ...employeeData,
      status: employeeData.employeeStatus,
    };

    // Only send password if user explicitly entered a new one
    if (dataToSend.password === "") {
      delete (dataToSend as any).password;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        await Swal.fire({
          title: "Success!",
          text: "Employee updated successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });

        router.push("/administrator/employee");
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: "Error",
          text: `Failed to update employee: ${errorData.error}`,
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong while updating employee.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading || isMasterLoading) {
    return <div className="p-6 text-center">Loading employee data...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow">
          {/* HEADER */}
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
                <span>Edit Employee</span>
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

          {/* STEPS */}
          <div className="p-8">
            <div className="flex items-center gap-6 mb-6">
              {["Personal Data", "Employment Data", "Account Data"].map(
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

            {/* Step 1: Personal Data */}
            {step === 1 && (
              <form>
                <div className="bg-white shadow p-6 rounded-md">
                  <h2 className="text-lg font-semibold mb-4">
                    Edit Personal Data
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <label>
                      First Name
                      <input
                        name="firstName"
                        type="text"
                        className="border p-2 rounded w-full"
                        value={employeeData.firstName}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Last Name
                      <input
                        name="lastName"
                        type="text"
                        className="border p-2 rounded w-full"
                        value={employeeData.lastName}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Place Of Birth
                      <input
                        name="placeOfBirth"
                        type="text"
                        className="border p-2 rounded w-full"
                        value={employeeData.placeOfBirth}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Birthdate
                      <input
                        name="birthdate"
                        type="date"
                        className="border p-2 rounded w-full"
                        value={employeeData.birthdate}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Gender
                      <select
                        name="gender"
                        className="border p-2 rounded w-full"
                        value={employeeData.gender}
                        onChange={handleChange}
                      >
                        <option value="">Select Gender</option>{" "}
                        <option value="Male">Male</option>{" "}
                        <option value="Female">Female</option>
                      </select>
                    </label>
                    <label>
                      Religion
                      <select
                        name="religion"
                        className="border p-2 rounded w-full"
                        value={employeeData.religion}
                        onChange={handleChange}
                      >
                        <option value="">Select Religion</option>{" "}
                        <option value="Islam">Islam</option>{" "}
                        <option value="Christian">Christian</option>{" "}
                        <option value="Hindu">Hindu</option>
                      </select>
                    </label>
                    <label>
                      Marital Status
                      <select
                        name="maritalStatus"
                        className="border p-2 rounded w-full"
                        value={employeeData.maritalStatus}
                        onChange={handleChange}
                      >
                        <option value="">Select Status</option>{" "}
                        <option value="Single">Single</option>{" "}
                        <option value="Married">Married</option>
                      </select>
                    </label>
                    <label>
                      Blood Type
                      <select
                        name="bloodType"
                        className="border p-2 rounded w-full"
                        value={employeeData.bloodType}
                        onChange={handleChange}
                      >
                        <option value="">Select Type</option>{" "}
                        <option value="A">A</option>{" "}
                        <option value="B">B</option>{" "}
                        <option value="O">O</option>{" "}
                        <option value="AB">AB</option>
                      </select>
                    </label>
                    <label className="col-span-2">
                      Email
                      <input
                        name="email"
                        type="email"
                        className="border p-2 rounded w-full"
                        value={employeeData.email}
                        onChange={handleChange}
                      />
                    </label>
                    <label className="col-span-2">
                      Phone Number
                      <input
                        name="phoneNumber"
                        type="tel"
                        className="border p-2 rounded w-full"
                        value={employeeData.phoneNumber}
                        onChange={handleChange}
                      />
                    </label>
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
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                      onClick={() => setStep(2)}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Step 2: Employment Data */}
            {step === 2 && (
              <form>
                <div className="bg-white shadow p-6 rounded-md">
                  <h2 className="text-lg font-semibold mb-4">
                    Edit Employment Data
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="col-span-2">
                      Company Name
                      <select
                        name="companyName"
                        className="border p-2 rounded w-full"
                        value={employeeData.companyName}
                        onChange={handleChange}
                        disabled={!masterData.branches.length}
                      >
                        <option value="">Select Company Branch</option>
                        {masterData.branches.map((b) => (
                          <option key={b.id} value={b.name}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="col-span-2">
                      Employee ID
                      <input
                        name="employeeId"
                        type="text"
                        className="border p-2 rounded w-full"
                        value={employeeData.employeeId}
                        onChange={handleChange}
                      />
                    </label>

                    <label>
                      Division
                      <select
                        name="division"
                        className="border p-2 rounded w-full"
                        value={employeeData.division}
                        onChange={handleChange}
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
                    <label>
                      Department
                      <select
                        name="department"
                        className="border p-2 rounded w-full"
                        value={employeeData.department}
                        onChange={handleChange}
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
                    <label>
                      Unit
                      <select
                        name="unit"
                        className="border p-2 rounded w-full"
                        value={employeeData.unit}
                        onChange={handleChange}
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
                    <label>
                      Job Level
                      <select
                        name="jobLevel"
                        className="border p-2 rounded w-full"
                        value={employeeData.jobLevel}
                        onChange={handleChange}
                      >
                        <option value="">Select Job Level</option>
                        {masterData.jobLevels.map((j) => (
                          <option key={j.id} value={j.name}>
                            {j.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Employee Status
                      <select
                        name="employeeStatus"
                        className="border p-2 rounded w-full"
                        value={employeeData.employeeStatus}
                        onChange={handleChange}
                      >
                        <option value="">Select Status</option>
                        {masterData.employeeStatuses.map((e) => (
                          <option key={e.id} value={e.name}>
                            {e.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Join Date
                      <input
                        name="joinDate"
                        type="date"
                        className="border p-2 rounded w-full"
                        value={employeeData.joinDate}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Sign Date
                      <input
                        name="signDate"
                        type="date"
                        className="border p-2 rounded w-full"
                        value={employeeData.signDate}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      End Employment Status Date
                      <input
                        name="endEmploymentStatusDate"
                        type="date"
                        className="border p-2 rounded w-full"
                        value={employeeData.endEmploymentStatusDate}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                      onClick={() => setStep(3)}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Step 3: Account Data */}
            {step === 3 && (
              <form onSubmit={handleUpdate}>
                <div className="bg-white shadow p-6 rounded-md">
                  <h2 className="text-lg font-semibold mb-4">
                    Edit Account Data
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label>Username</label>
                      <input
                        name="username"
                        type="text"
                        className="border p-2 rounded w-full"
                        value={employeeData.username}
                        onChange={handleChange}
                        readOnly
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label>Password (leave blank if not changing)</label>
                      <input
                        name="password"
                        type="password"
                        className="border p-2 rounded w-full"
                        value={employeeData.password}
                        onChange={handleChange}
                        placeholder="Enter new password or leave blank"
                      />
                    </div>
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
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={() => setStep(2)}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
