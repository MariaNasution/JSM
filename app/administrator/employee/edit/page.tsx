"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function EditEmployeePage() {
  const { id } = useParams(); // ambil ID dari URL
  const [step, setStep] = useState(1);

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-600">
        Employee / Employee Data / <span className="font-semibold">Edit Employee</span>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full ${
            step === 1 ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
        >
          1
        </div>
        <span className={step === 1 ? "font-semibold text-blue-600" : "text-gray-600"}>
          Personal Data
        </span>
        <div className="w-10 border-t border-gray-300" />
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full ${
            step === 2 ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
        >
          2
        </div>
        <span className={step === 2 ? "font-semibold text-blue-600" : "text-gray-600"}>
          Employment Data
        </span>
      </div>

      {/* Form */}
      {step === 1 ? (
        <div className="bg-white shadow p-6 rounded-md">
          <h2 className="text-lg font-semibold mb-4">Edit Personal Data</h2>

          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" className="border p-2 rounded" defaultValue="John" />
            <input type="text" placeholder="Last Name" className="border p-2 rounded" defaultValue="Doe" />
            <input type="text" placeholder="Place of Birth" className="border p-2 rounded" defaultValue="Medan" />
            <input type="date" className="border p-2 rounded" defaultValue="1995-06-15" />
            <select className="border p-2 rounded">
              <option>Male</option>
              <option>Female</option>
            </select>
            <input type="email" placeholder="Email" className="border p-2 rounded" defaultValue="john.doe@email.com" />
            <input type="text" placeholder="Phone Number" className="border p-2 rounded" defaultValue="08123456789" />
          </div>

          <div className="flex justify-between mt-6">
            <button
              className="px-4 py-2 rounded bg-gray-300 text-gray-700"
              onClick={() => setStep(2)}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow p-6 rounded-md">
          <h2 className="text-lg font-semibold mb-4">Edit Employment Data</h2>

          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Company Name" className="border p-2 rounded" defaultValue="PT. ABC" />
            <input type="text" placeholder="Employee ID" className="border p-2 rounded" defaultValue="EMP-001" />
            <input type="text" placeholder="Division" className="border p-2 rounded" defaultValue="IT" />
            <input type="text" placeholder="Department" className="border p-2 rounded" defaultValue="Software" />
            <input type="text" placeholder="Job Level" className="border p-2 rounded" defaultValue="Senior" />
            <input type="date" className="border p-2 rounded" defaultValue="2020-01-10" />
          </div>

          <div className="flex justify-between mt-6">
            <button
              className="px-4 py-2 rounded bg-gray-300 text-gray-700"
              onClick={() => setStep(1)}
            >
              Back
            </button>
            <button className="px-4 py-2 rounded bg-green-600 text-white">Save</button>
          </div>
        </div>
      )}
    </div>
  );
}
