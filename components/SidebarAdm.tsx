"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Settings, 
  Users, 
  Building2, 
  Briefcase, 
  Layers, 
  UserCog, 
  UserCheck, 
  BarChart 
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);

  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-64 bg-white border-r min-h-screen shadow-sm">
      {/* User Profile */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div>
            <div className="font-semibold text-gray-800">Maria Nasution</div>
            <div className="text-sm text-gray-500">Administrator</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-4">
        {/* Employee */}
        <Link href="/administrator/employee">
          <div
            className={`px-6 py-3 flex items-center space-x-3 cursor-pointer transition-colors ${
              isActive("/administrator/employee")
                ? "bg-blue-100 text-blue-700 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Employee</span>
          </div>
        </Link>


        {/* Settings - with submenu */}
        <div>
          <div
            className={`px-6 py-3 flex items-center space-x-3 cursor-pointer transition-colors ${
              isSettingsOpen ? "text-blue-700" : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </div>

          {isSettingsOpen && (
            <div className="ml-6 border-l">
              <Link href="/administrator/company-branch">
                <div
                  className={`pl-6 py-2 flex items-center space-x-3 cursor-pointer ${
                    isActive("/administrator/company-branch")
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-gray-600 hover:bg-blue-50"
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Company Branch</span>
                </div>
              </Link>

              <Link href="/administrator/division">
                <div
                  className={`pl-6 py-2 flex items-center space-x-3 cursor-pointer ${
                    isActive("/administrator/division")
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-gray-600 hover:bg-blue-50"
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Division</span>
                </div>
              </Link>

              <Link href="/administrator/department">
                <div
                  className={`pl-6 py-2 flex items-center space-x-3 cursor-pointer ${
                    isActive("/administrator/department")
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-gray-600 hover:bg-blue-50"
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Department</span>
                </div>
              </Link>

              <Link href="/administrator/unit">
                <div
                  className={`pl-6 py-2 flex items-center space-x-3 cursor-pointer ${
                    isActive("/administrator/unit")
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-gray-600 hover:bg-blue-50"
                  }`}
                >
                  <UserCog className="w-4 h-4" />
                  <span>Unit</span>
                </div>
              </Link>
              
              <Link href="/administrator/job-level">
                <div
                  className={`pl-6 py-2 flex items-center space-x-3 cursor-pointer ${
                    isActive("/administrator/job-level")
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-gray-600 hover:bg-blue-50"
                  }`}
                >
                  <BarChart className="w-4 h-4" />
                  <span>Job Level</span>
                </div>
              </Link>

              <Link href="/administrator/employee-type">
                <div
                  className={`pl-6 py-2 flex items-center space-x-3 cursor-pointer ${
                    isActive("/administrator/employee-type")
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-gray-600 hover:bg-blue-50"
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Employee Type</span>
                </div>
              </Link>

              <Link href="/administrator/employee-status">
                <div
                  className={`pl-6 py-2 flex items-center space-x-3 cursor-pointer ${
                    isActive("/administrator/employee-status")
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-gray-600 hover:bg-blue-50"
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Employee Status</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
