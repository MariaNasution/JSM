'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Bell, Calendar, ChevronRight } from 'lucide-react';
import { Course } from '@/types';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'all' | 'mandatory' | 'optional'>('all');

  const courses: Course[] = [
    {
      id: 1,
      title: "Web Development",
      instructor: "Andi Zeeshan",
      dueDate: "Due - 7 Apr 2018",
      progress: 78,
      totalLectures: 16,
      completedLectures: 7,
      status: "Continue",
      statusType: "continue",
      tag: "Mandatory",
      tagColor: "bg-red-500"
    },
    {
      id: 2,
      title: "Database Design", 
      instructor: "Jonathan Chris",
      dueDate: "Due - 16 Apr 2018",
      progress: 100,
      totalLectures: 16,
      completedLectures: 16,
      status: "Retake",
      statusType: "retake",
      tag: "Optional",
      tagColor: "bg-green-500"
    },
    {
      id: 3,
      title: "Expert Web Development",
      instructor: "Andi Zeeshan",
      dueDate: "Due -",
      progress: 30,
      totalLectures: 16,
      completedLectures: 5,
      status: "Start",
      statusType: "start",
      tag: "Mandatory",
      tagColor: "bg-red-500"
    },
    {
      id: 4,
      title: "Basic Java",
      instructor: "Jonathan Chris", 
      dueDate: "Due - 16 Apr 2020",
      progress: 10,
      totalLectures: 16,
      completedLectures: 1,
      status: "Start",
      statusType: "start",
      tag: "Optional",
      tagColor: "bg-green-500"
    }
  ];

  // Filter sesuai tab
  const filteredCourses = courses.filter((course) => {
    if (activeTab === 'mandatory') return course.tag === 'Mandatory';
    if (activeTab === 'optional') return course.tag === 'Optional';
    return true; // 'all'
  });

  const getProgressBarColor = (progress: number): string => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    return 'bg-orange-500';
  };

  const getButtonClass = (statusType: string): string => {
    switch (statusType) {
      case 'continue':
        return 'bg-gray-600 text-white';
      case 'retake':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-300 text-gray-700';
    }
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Course</h1>
          <div className="flex items-center space-x-4">
            <Bell className="w-6 h-6 text-gray-600" />
            <Calendar className="w-6 h-6 text-gray-600" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8">
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Filter Courses :</p>
            <div className="flex space-x-4">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>All Progress</option>
                <option>Completed</option>
                <option>In Progress</option>
                <option>Overdue</option>
              </select>
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>Due Dates</option>
                <option>Newest</option>
                <option>Oldest</option>
              </select>
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>Passing Grade</option>
                <option>Above 70%</option>
                <option>Below 70%</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 border-b">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 ${
                activeTab === 'all'
                  ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              All Course
            </button>
            <button
              onClick={() => setActiveTab('mandatory')}
              className={`px-4 py-2 ${
                activeTab === 'mandatory'
                  ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Mandatory Course
            </button>
            <button
              onClick={() => setActiveTab('optional')}
              className={`px-4 py-2 ${
                activeTab === 'optional'
                  ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Optional Course
            </button>
          </div>
          
        </div>

        {/* Course Cards */}
        <div className="space-y-4">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
                    {course.tag && (
                      <span className={`text-xs text-white px-2 py-1 rounded ${course.tagColor}`}>
                        {course.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{course.dueDate}</p>
                  <p className="text-gray-600 text-sm">{course.instructor}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-orange-500 bg-orange-50 px-3 py-1 rounded-full text-sm mb-2">
                    Due Online Test<br />Don&apos;t be leave this course
                    </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress - {course.progress}%</span>
                  <span>Training Target - {course.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className={`h-2 rounded-full ${getProgressBarColor(course.progress)}`}
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>
                    {course.completedLectures} of {course.totalLectures} lectures completed
                  </span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  className={`px-4 py-2 rounded text-sm font-medium ${getButtonClass(course.statusType)}`}
                >
                  {course.status}
                </button>
                <button className="px-4 py-2 border rounded text-sm text-gray-600 hover:bg-gray-50">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button className="w-8 h-8 bg-blue-500 text-white rounded flex items-center justify-center">
            1
          </button>
          <button className="w-8 h-8 bg-gray-200 text-gray-700 rounded flex items-center justify-center hover:bg-gray-300">
            2
          </button>
          <button className="w-8 h-8 bg-gray-200 text-gray-700 rounded flex items-center justify-center hover:bg-gray-300">
            3
          </button>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </Layout>
  );
}
