"use client";
import Layout from "../../components/Layout";
import { Download } from "lucide-react";

export default function Certificate() {
  const certificates = [
    {
      id: 1,
      course: "Web Developer",
      score: "71/100",
      attempts: [
        { label: "First Attempt", score: 71, date: "2024-07-06" },
      ],
    },
    {
      id: 2,
      course: "Web Developer",
      score: "80/100",
      attempts: [
        { label: "First Attempt", score: 55, date: "2024-12-18" },
        { label: "Second Attempt", score: 65, date: "2024-12-19" },
        { label: "Third Attempt", score: 80, date: "2024-12-19" },
      ],
    },
    {
      id: 3,
      course: "Web Developer",
      score: "85/100",
      attempts: [
        { label: "First Attempt", score: 60, date: "2024-12-18" },
        { label: "Second Attempt", score: 85, date: "2024-12-19" },
      ],
    },
  ];

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-3 rounded-t-lg">
          <h1 className="text-lg font-semibold">Certificate</h1>
        </div>

        {/* Completed Summary */}
        <div className="bg-green-100 text-center py-6 rounded-b-lg mb-8">
          <p className="text-3xl font-bold text-green-700">3</p>
          <p className="text-green-700">Completed</p>
        </div>

        {/* Certificate List */}
        <div className="space-y-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="border border-green-400 rounded-lg p-6 flex flex-col space-y-4"
            >
              <div>
                <h2 className="font-semibold text-gray-800">
                  {cert.course}
                </h2>
                <p className="text-sm text-gray-500">Skor: {cert.score}</p>
              </div>

              {/* Attempts */}
              <div>
                <p className="font-medium text-gray-700 mb-2">Quiz Attempt</p>
                <div className="space-y-2">
                  {cert.attempts.map((a, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-sm"
                    >
                      {/* Nama attempt */}
                      <span>{a.label}</span>

                      {/* Nilai + tanggal */}
                      <div className="flex items-center space-x-4">
                        <span
                          className={`font-medium ${
                            a.score >= 70 ? "text-green-600" : "text-red-500"
                          }`}
                        >
                          {a.score}
                        </span>
                        <span className="text-gray-500">{a.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>


              {/* Download Button */}
              <div className="flex justify-end">
                <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          <button className="px-3 py-1 border rounded-lg">&lt;</button>
          <button className="px-3 py-1 border bg-blue-600 text-white rounded-lg">
            1
          </button>
          <button className="px-3 py-1 border rounded-lg">2</button>
          <button className="px-3 py-1 border rounded-lg">3</button>
          <button className="px-3 py-1 border rounded-lg">&gt;</button>
        </div>
      </div>
    </Layout>
  );
}
