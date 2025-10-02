"use client";

import React, { useState } from "react";

export default function AddEmployee() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="p-6">
      {/* Progress Step */}
      <div className="flex items-center gap-6 mb-6">
        <div className={`flex items-center gap-2 ${step === 1 ? "text-blue-600 font-bold" : "text-gray-500"}`}>
          <span className="w-7 h-7 flex items-center justify-center rounded-full border-2 border-blue-600">
            1
          </span>
          <span>Personal Data</span>
        </div>
        <div className={`flex items-center gap-2 ${step === 2 ? "text-blue-600 font-bold" : "text-gray-500"}`}>
          <span className="w-7 h-7 flex items-center justify-center rounded-full border-2 border-blue-600">
            2
          </span>
          <span>Employment Data</span>
        </div>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Personal Data</h2>
          <form className="grid grid-cols-2 gap-4">
            <input placeholder="First Name" className="border p-2 rounded" />
            <input placeholder="Last Name" className="border p-2 rounded" />
            <input placeholder="Place Of Birth" className="border p-2 rounded" />
            <input type="date" placeholder="Birthdate" className="border p-2 rounded" />
            <select className="border p-2 rounded">
              <option>Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
            <select className="border p-2 rounded">
              <option>Religion</option>
              <option>Islam</option>
              <option>Christian</option>
              <option>Hindu</option>
            </select>
            <select className="border p-2 rounded">
              <option>Marital Status</option>
              <option>Single</option>
              <option>Married</option>
            </select>
            <select className="border p-2 rounded">
              <option>Blood Type</option>
              <option>A</option>
              <option>B</option>
              <option>O</option>
              <option>AB</option>
            </select>
            <input type="email" placeholder="Email" className="border p-2 rounded col-span-2" />
            <input type="text" placeholder="Phone Number" className="border p-2 rounded col-span-2" />
          </form>
          <div className="flex justify-between mt-6">
            <button className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
            <button onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded">Next</button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Employment Data</h2>
          <form className="grid grid-cols-2 gap-4">
            <input placeholder="Company Name" className="border p-2 rounded col-span-2" />
            <input placeholder="Employee ID" className="border p-2 rounded col-span-2" />
            <input placeholder="Division" className="border p-2 rounded" />
            <input placeholder="Department" className="border p-2 rounded" />
            <input placeholder="Unit" className="border p-2 rounded" />
            <input placeholder="Job Level" className="border p-2 rounded" />
            <input placeholder="Employee Status" className="border p-2 rounded" />
            <input type="date" placeholder="Join Date" className="border p-2 rounded" />
            <input type="date" placeholder="Sign Date" className="border p-2 rounded" />
            <input type="date" placeholder="End Employment Status Date" className="border p-2 rounded col-span-2" />
          </form>
          <div className="flex justify-between mt-6">
            <button onClick={prevStep} className="bg-green-500 text-white px-4 py-2 rounded">Back</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
          </div>
        </div>
      )}
    </div>
  );
}
