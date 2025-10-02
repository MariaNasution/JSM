"use client";
import { useState } from "react";
import Layout from "../../components/Layout";

export default function Quiz() {
  const [activeTab, setActiveTab] = useState("all");

  const quizzes = [
    {
      id: 1,
      title: "Database Design 2",
      category: "mandatory",
      deadline: "10 July 2025",
      attempts: 32,
      passingGrade: 80,
      questions: 20,
      status: "overdue",
      attemptsDetail: [
        { label: "First Attempt", score: 71 },
        { label: "Second Attempt", score: 75 },
      ],
    },
    {
      id: 2,
      title: "Web Developer",
      category: "optional",
      deadline: "12 July 2025",
      attempts: 23,
      passingGrade: 60,
      questions: 15,
      status: "active",
      attemptsDetail: [
        { label: "First Attempt", score: 71 },
        { label: "Second Attempt", score: 75 },
      ],
    },
    {
      id: 3,
      title: "Web Developer",
      category: "mandatory",
      deadline: "14 July 2025",
      attempts: 21,
      passingGrade: 65,
      questions: 20,
      status: "overdue",
      attemptsDetail: [{ label: "First Attempt", score: 84 }],
    },
  ];

  const filteredQuizzes =
    activeTab === "all"
      ? quizzes
      : quizzes.filter((q) => q.category === activeTab);

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Quiz</h1>

        {/* Search Bar */}
        <div className="flex items-center space-x-2 mb-6">
          <input
            type="text"
            placeholder="Search Quiz..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Search
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            All Quiz
          </button>
          <button
            onClick={() => setActiveTab("mandatory")}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === "mandatory"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Mandatory Quiz
          </button>
          <button
            onClick={() => setActiveTab("optional")}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === "optional"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Optional Quiz
          </button>
        </div>

        {/* Filter Bar */}
        <div className="mt-4 mb-8">
          <p className="text-sm font-medium text-gray-700 mb-2">Recent Quiz :</p>
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

        {/* Quiz List */}
        {filteredQuizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white rounded-xl shadow mb-6 overflow-hidden"
          >
            {/* Card Header */}
            <div className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
              <h2 className="font-bold">{quiz.title}</h2>
              {quiz.status === "overdue" && (
                <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                  Quiz Overdue
                </span>
              )}
            </div>

            {/* Card Content */}
            <div className="p-6">
              <div className="flex space-x-6 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Deadline</p>
                  <p className="font-medium">{quiz.deadline}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Attempts</p>
                  <p className="font-medium">{quiz.attempts} Attempts</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Passing Grade</p>
                  <p className="font-medium">{quiz.passingGrade}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Questions</p>
                  <p className="font-medium">
                    Total {quiz.questions} questions
                  </p>
                </div>
              </div>

              {/* Attempts Detail */}
              <div className="mb-4">
                <p className="font-semibold text-gray-700">Quiz Attempt</p>
                {quiz.attemptsDetail.map((a, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <span>{a.label}</span>
                    <span
                      className={`font-semibold ${
                        a.score >= quiz.passingGrade
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {a.score}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Reattempt Quiz
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                  Request Remedial
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          <button className="px-3 py-1 border rounded-lg">1</button>
          <button className="px-3 py-1 border bg-blue-600 text-white rounded-lg">
            2
          </button>
          <button className="px-3 py-1 border rounded-lg">3</button>
        </div>
      </div>
    </Layout>
  );
}
