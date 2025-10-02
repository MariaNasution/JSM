"use client";
import { useState } from "react";

interface BranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; status: string }) => void;
}

export default function BranchModal({ isOpen, onClose, onSave }: BranchModalProps) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[400px] rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Add Company Branch</h2>

        {/* Name */}
        <label className="block text-sm font-medium">Name(*)</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1 mb-3"
          placeholder="Enter branch name"
        />

        {/* Status */}
        <label className="block text-sm font-medium">Status(*)</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1 mb-4"
        >
          <option value="">-- Select Status --</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave({ name, status });
              onClose();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
