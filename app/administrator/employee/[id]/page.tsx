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
}

export default function EditEmployeePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

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
              <button className="p-2 hover:bg-blue-600 rounded">
                <Bell size={20} />
              </button>
              <button className="p-2 hover:bg-blue-600 rounded">
                <FileText size={20} />
              </button>
            </div>
          </div>
          <div className="p-8">
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
              <div className="w-10 border-t border-gray-300" />
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

            {step === 1 && (
              <form>
                <div className="bg-white shadow p-6 rounded-md">
                  <h2 className="text-lg font-semibold mb-4">
                    Edit Personal Data
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      className="border p-2 rounded"
                      value={employeeData.firstName}
                      onChange={handleChange}
                    />
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      className="border p-2 rounded"
                      value={employeeData.lastName}
                      onChange={handleChange}
                    />
                    <input
                      name="placeOfBirth"
                      type="text"
                      placeholder="Place Of Birth"
                      className="border p-2 rounded"
                      value={employeeData.placeOfBirth}
                      onChange={handleChange}
                    />
                    <input
                      name="birthdate"
                      type="date"
                      placeholder="Birthdate"
                      className="border p-2 rounded"
                      value={employeeData.birthdate}
                      onChange={handleChange}
                    />
                    <select
                      name="gender"
                      className="border p-2 rounded"
                      value={employeeData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <select
                      name="religion"
                      className="border p-2 rounded"
                      value={employeeData.religion}
                      onChange={handleChange}
                    >
                      <option value="">Religion</option>
                      <option value="Islam">Islam</option>
                      <option value="Christian">Christian</option>
                      <option value="Hindu">Hindu</option>
                    </select>
                    <select
                      name="maritalStatus"
                      className="border p-2 rounded"
                      value={employeeData.maritalStatus}
                      onChange={handleChange}
                    >
                      <option value="">Marital Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                    </select>
                    <select
                      name="bloodType"
                      className="border p-2 rounded"
                      value={employeeData.bloodType}
                      onChange={handleChange}
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
                      placeholder="Email"
                      className="border p-2 rounded col-span-2"
                      value={employeeData.email}
                      onChange={handleChange}
                    />
                    <input
                      name="phoneNumber"
                      type="tel"
                      placeholder="Phone Number"
                      className="border p-2 rounded col-span-2"
                      value={employeeData.phoneNumber}
                      onChange={handleChange}
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
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                      onClick={() => setStep(2)}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleUpdate}>
                <div className="bg-white shadow p-6 rounded-md">
                  <h2 className="text-lg font-semibold mb-4">
                    Edit Employment Data
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      name="companyName"
                      type="text"
                      placeholder="Company Name"
                      className="border p-2 rounded col-span-2"
                      value={employeeData.companyName}
                      onChange={handleChange}
                    />
                    <input
                      name="employeeId"
                      type="text"
                      placeholder="Employee ID"
                      className="border p-2 rounded col-span-2"
                      value={employeeData.employeeId}
                      onChange={handleChange}
                    />
                    <input
                      name="division"
                      type="text"
                      placeholder="Division"
                      className="border p-2 rounded"
                      value={employeeData.division}
                      onChange={handleChange}
                    />
                    <input
                      name="department"
                      type="text"
                      placeholder="Department"
                      className="border p-2 rounded"
                      value={employeeData.department}
                      onChange={handleChange}
                    />
                    <input
                      name="unit"
                      type="text"
                      placeholder="Unit"
                      className="border p-2 rounded"
                      value={employeeData.unit}
                      onChange={handleChange}
                    />
                    <input
                      name="jobLevel"
                      type="text"
                      placeholder="Job Level"
                      className="border p-2 rounded"
                      value={employeeData.jobLevel}
                      onChange={handleChange}
                    />
                    <select
                      name="employeeStatus"
                      className="border p-2 rounded"
                      value={employeeData.employeeStatus}
                      onChange={handleChange}
                    >
                      <option value="">Employee Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="On Contract">On Contract</option>
                    </select>
                    <input
                      name="joinDate"
                      type="date"
                      placeholder="Join Date"
                      className="border p-2 rounded"
                      value={employeeData.joinDate}
                      onChange={handleChange}
                    />
                    <input
                      name="signDate"
                      type="date"
                      placeholder="Sign Date"
                      className="border p-2 rounded"
                      value={employeeData.signDate}
                      onChange={handleChange}
                    />
                    <input
                      name="endEmploymentStatusDate"
                      type="date"
                      placeholder="End Employment Status Date"
                      className="border p-2 rounded col-span-2"
                      value={employeeData.endEmploymentStatusDate}
                      onChange={handleChange}
                    />
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
