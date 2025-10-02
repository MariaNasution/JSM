"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (id) {
      fetchEmployeeData();
    }
  }, [id]);

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
          password: "",
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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/api/employees/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employeeData),
        }
      );

      if (response.ok) {
        alert("Employee updated successfully!");
        router.push("/administrator/employee");
      } else {
        const errorData = await response.json();
        alert(`Failed to update employee: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Error updating employee.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
                <Link href="/administrator/employee" className="hover:underline">
                  Employee
                </Link>
                <span>/</span>
                <span>Edit Employee</span>
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

          {/* STEPS */}
          <div className="p-8">
            <div className="flex items-center gap-6 mb-6">
              {/* Step Indicators */}
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
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
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
                        <option value="">Select Religion</option>
                        <option value="Islam">Islam</option>
                        <option value="Christian">Christian</option>
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
                        <option value="">Select Status</option>
                        <option value="Single">Single</option>
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
                        <option value="">Select Type</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="O">O</option>
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
                  <h2 className="text-lg font-semibold mb-4">Edit Employment Data</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <input
                        name="companyName"
                        type="text"
                        className="border p-2 rounded w-full"
                        value={employeeData.companyName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employee ID
                      </label>
                      <input
                        name="employeeId"
                        type="text"
                        className="border p-2 rounded w-full"
                        value={employeeData.employeeId}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Division
                      </label>
                      <input
                        name="division"
                        type="text"
                        className="border p-2 rounded w-full"
                        value={employeeData.division}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Department
                      </label>
                      <input
                        name="department"
                        type="text"
                        className="border p-2 rounded w-full"
                        value={employeeData.department}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Unit
                      </label>
                      <input
                        name="unit"
                        type="text"
                        className="border p-2 rounded w-full"
                        value={employeeData.unit}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Job Level
                      </label>
                      <input
                        name="jobLevel"
                        type="text"
                        className="border p-2 rounded w-full"
                        value={employeeData.jobLevel}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employee Status
                      </label>
                      <select
                        name="employeeStatus"
                        className="border p-2 rounded w-full"
                        value={employeeData.employeeStatus}
                        onChange={handleChange}
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
                        name="joinDate"
                        type="date"
                        className="border p-2 rounded w-full"
                        value={employeeData.joinDate}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sign Date
                      </label>
                      <input
                        name="signDate"
                        type="date"
                        className="border p-2 rounded w-full"
                        value={employeeData.signDate}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Employment Status Date
                      </label>
                      <input
                        name="endEmploymentStatusDate"
                        type="date"
                        className="border p-2 rounded w-full"
                        value={employeeData.endEmploymentStatusDate}
                        onChange={handleChange}
                      />
                    </div>
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
                    {[
                      ["username", "Username", "text"],
                      [
                        "password",
                        "Password (leave blank if not changing)",
                        "password",
                      ],
                    ].map(([name, label, type]) => (
                      <div key={name} className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {label}
                        </label>
                        <input
                          type={type}
                          name={name}
                          value={(employeeData as any)[name]}
                          onChange={handleChange}
                          className="border p-2 rounded w-full"
                        />
                      </div>
                    ))}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                      </label>
                      <select
                        name="role"
                        value={employeeData.role}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                      >
                        <option value="">Select Role</option>
                        <option value="Admin">Learner</option>
                        <option value="Manager">Trainer</option>
                        <option value="Employee">Administrator</option>
                        <option value="Employee">Super Admin</option>
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
