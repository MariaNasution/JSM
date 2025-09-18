'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  BookOpen, 
  User, 
  ChevronDown, 
  ChevronRight, 
  ClipboardCheck, 
  Award, 
  History 
} from 'lucide-react';
import { SidebarProps } from '@/types';

export default function Sidebar({ className = '' }: SidebarProps) {
  const [isCourseOpen, setIsCourseOpen] = useState<boolean>(true);
  const pathname = usePathname();

  const toggleCourse = (): void => {
    setIsCourseOpen(!isCourseOpen);
  };

  const isActiveMenu = (path: string): boolean => {
    return pathname === path;
  };

  const isCourseMenuActive = (): boolean => {
    return ['/course', '/quiz', '/certificate'].includes(pathname);
  };

  return (
    <div className={`w-64 bg-white shadow-sm border-r min-h-screen ${className}`}>
      {/* User Profile */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <div className="font-semibold text-gray-800">Maria Nasution</div>
            <div className="text-sm text-gray-500">Learner</div>
          </div>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="mt-4">
        {/* Dashboard */}
        <Link href="/dashboard">
          <div className={`px-6 py-3 flex items-center space-x-3 cursor-pointer transition-colors ${
            isActiveMenu('/dashboard') 
              ? 'bg-blue-50 border-r-4 border-blue-500 text-blue-700' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}>
            <Home className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </div>
        </Link>

        {/* Course with Dropdown */}
        <div>
          <div 
            className={`px-6 py-3 flex items-center justify-between cursor-pointer transition-colors ${
              isCourseMenuActive()
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={toggleCourse}
          >
            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">Course</span>
            </div>
            {isCourseOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </div>

          {/* Dropdown Items */}
          {isCourseOpen && (
            <div className="bg-blue-50 border-l-4 border-blue-200 ml-4">
              <Link href="/course">
                <div className={`pl-10 pr-6 py-2 flex items-center space-x-3 cursor-pointer transition-colors ${
                  isActiveMenu('/course') 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-blue-100'
                }`}>
                  <BookOpen className="w-4 h-4" />
                  <span>Course</span>
                </div>
              </Link>
              
              <Link href="/quiz">
                <div className={`pl-10 pr-6 py-2 flex items-center space-x-3 cursor-pointer transition-colors ${
                  isActiveMenu('/quiz') 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-blue-100'
                }`}>
                  <ClipboardCheck className="w-4 h-4" />
                  <span>Quiz</span>
                </div>
              </Link>
              
              <Link href="/certificate">
                <div className={`pl-10 pr-6 py-2 flex items-center space-x-3 cursor-pointer transition-colors ${
                  isActiveMenu('/certificate') 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-blue-100'
                }`}>
                  <Award className="w-4 h-4" />
                  <span>Certificate</span>
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* History Activity */}
        <Link href="/history">
          <div className={`px-6 py-3 flex items-center space-x-3 cursor-pointer transition-colors ${
            isActiveMenu('/history') 
              ? 'bg-blue-50 border-r-4 border-blue-500 text-blue-700' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}>
            <History className="w-5 h-5" />
            <span className="font-medium">History Activity</span>
          </div>
        </Link>
      </nav>
    </div>
  );
}