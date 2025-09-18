'use client';

import React from 'react';
import Layout from '@/components/Layout';
import { Bell, Calendar, ChevronRight } from 'lucide-react';
import { Course } from '@/types';

export default function Dashboard() {
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
      statusType: "retake"
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
      statusType: "start"
    }
  ];

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
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Bell className="w-6 h-6 text-gray-600" />
            <Calendar className="w-6 h-6 text-gray-600" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">My Courses</h2>
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-3xl font-bold text-gray-800 mb-2">4</div>
              <div className="text-gray-600">Total Course</div>
              <div className="w-full h-2 bg-red-200 rounded-full mt-3">
                <div className="w-full h-2 bg-red-500 rounded-full"></div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-3xl font-bold text-gray-800 mb-2">1</div>
              <div className="text-gray-600">Completed</div>
              <div className="w-full h-2 bg-blue-200 rounded-full mt-3">
                <div className="w-1/4 h-2 bg-blue-500 rounded-full"></div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-3xl font-bold text-gray-800 mb-2">2</div>
              <div className="text-gray-600">In Progress</div>
              <div className="w-full h-2 bg-green-200 rounded-full mt-3">
                <div className="w-1/2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-3xl font-bold text-gray-800 mb-2">1</div>
              <div className="text-gray-600">Overdue</div>
              <div className="w-full h-2 bg-purple-200 rounded-full mt-3">
                <div className="w-1/4 h-2 bg-purple-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 border-b">
            <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600 font-medium">
              All Course
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
              Mandatory Course
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
              Optional Course
            </button>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">Recent Courses</div>
            <div className="flex space-x-4 text-sm text-gray-600">
              <span>Latest</span>
              <span>Upcoming</span>
              <span>Urgent</span>
            </div>
          </div>
        </div>

        {/* Course Cards */}
        <div className="space-y-4">
          {courses.map((course) => (
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
                  <span>{course.completedLectures} of {course.totalLectures} lectures completed</span>
                  <span>
                    {course.status === "Continue" && "Gap played - Complete and move to net step"}
                    {course.status === "Retake" && "Test passed - Additional questions"}
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