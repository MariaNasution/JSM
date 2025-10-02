"use client";

import { Users, Bell, FileText, Download, Upload } from 'lucide-react';
import Link from 'next/link';

export default function ImportEmployee() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Content tanpa sidebar */}
      <div className="flex-1 bg-gray-50 p-6">
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="bg-blue-700 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={20} />
              <div className="flex items-center gap-2 text-sm">
                <Link href="/administrator/employee" className="hover:underline">Employee</Link>
                <span>/</span>
                <span>Import Employee</span>
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

          {/* Body */}
          <div className="p-8">
            <div className="flex justify-end mb-6">
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                <Download size={18} />
                Download Template
              </button>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="bg-gray-100 p-6 rounded-full mb-4">
                  <Upload size={48} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">Upload File Here</h3>
                <p className="text-gray-500 mb-2">
                  Drag & drop your file here or{' '}
                  <button className="text-blue-600 hover:underline">browse files</button>
                </p>
                <p className="text-sm text-gray-400">
                  Supported formats: .xlsx, .xls, .csv (Max. 10MB)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
