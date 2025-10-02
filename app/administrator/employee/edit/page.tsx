"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Users, Bell, FileText } from "lucide-react";
import Link from "next/link";

export default function EditEmployeePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string; // Get ID from URL

  const [step, setStep] = useState(1);
  const [employeeData, setEmployeeData] = useState({
    name: "",
    division: "",
    department: "",
    jobLevel: "",
    joinDate: "",
    status: "",
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
          ...data,
          joinDate: new Date(data.joinDate).toISOString().split("T")[0], // Format date to YYYY-MM-DD
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

            <form onSubmit={handleUpdate}>
              {step === 1 ? (
                <div className="bg-white shadow p-6 rounded-md">
                  <h2 className="text-lg font-semibold mb-4">
                    Edit Personal Data
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      name="name"
                      type="text"
                      placeholder="Full Name"
                      className="border p-2 rounded"
                      value={employeeData.name}
                      onChange={handleChange}
                      required
                    />
                    <input
                      name="division"
                      type="text"
                      placeholder="Division"
                      className="border p-2 rounded"
                      value={employeeData.division}
                      onChange={handleChange}
                      required
                    />
                    <input
                      name="department"
                      type="text"
                      placeholder="Department"
                      className="border p-2 rounded"
                      value={employeeData.department}
                      onChange={handleChange}
                      required
                    />
                    <input
                      name="jobLevel"
                      type="text"
                      placeholder="Job Level"
                      className="border p-2 rounded"
                      value={employeeData.jobLevel}
                      onChange={handleChange}
                      required
                    />
                    <input
                      name="joinDate"
                      type="date"
                      className="border p-2 rounded"
                      value={employeeData.joinDate}
                      onChange={handleChange}
                      required
                    />
                    <select
                      name="status"
                      className="border p-2 rounded"
                      value={employeeData.status}
                      onChange={handleChange}
                      required
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="On Contract">On Contract</option>
                    </select>
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
              ) : (
                <div className="bg-white shadow p-6 rounded-md">
                  <h2 className="text-lg font-semibold mb-4">
                    Edit Employment Data
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <p className="col-span-2 text-sm text-gray-500">
                      The employment data is linked to personal data. You can
                      find all editable fields on the first step.
                    </p>
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
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
