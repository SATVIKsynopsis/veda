"use client";

import React, { useState } from "react";
import { GeneratedAssignment } from "@/app/store/assignmentStore";
import dynamic from "next/dynamic";

interface QuestionDisplayProps {
  assignment: GeneratedAssignment;
  onRegenerate?: () => void;
}

export default function QuestionDisplay({
  assignment,
  onRegenerate,
}: QuestionDisplayProps) {
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    rollNumber: "",
    section: "",
  });

  const [downloading, setDownloading] = useState(false);

  const handleStudentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const downloadPDF = async () => {
    setDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const element = document.getElementById("question-paper");
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 295;

      let heightLeft = canvas.height * (imgWidth / canvas.width);
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, heightLeft);

      while (heightLeft >= pageHeight) {
        position = heightLeft - pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, -position, imgWidth, heightLeft);
        heightLeft -= pageHeight;
      }

      pdf.save(`${assignment.title || "question-paper"}.pdf`);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Action Bar */}
        <div className="mb-6 flex gap-4 justify-end">
          <button
            onClick={downloadPDF}
            disabled={downloading}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition font-medium"
          >
            {downloading ? "Downloading..." : "Download PDF"}
          </button>
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Regenerate
            </button>
          )}
        </div>

        {/* Question Paper */}
        <div
          id="question-paper"
          className="bg-white shadow-lg rounded-lg p-8 mb-8"
        >
          {/* Header */}
          <div className="text-center mb-8 pb-8 border-b-2 border-gray-300">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {assignment.title}
            </h1>
            <p className="text-gray-600 text-sm">{assignment.instructions}</p>
          </div>

          {/* Student Info Section */}
          <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Student Information
            </h2>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={studentInfo.name}
                  onChange={handleStudentInfoChange}
                  placeholder="___________________________"
                  className="w-full px-2 py-2 border-b-2 border-gray-400 focus:border-blue-600 focus:outline-none bg-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Roll Number
                </label>
                <input
                  type="text"
                  name="rollNumber"
                  value={studentInfo.rollNumber}
                  onChange={handleStudentInfoChange}
                  placeholder="___________________________"
                  className="w-full px-2 py-2 border-b-2 border-gray-400 focus:border-blue-600 focus:outline-none bg-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section
                </label>
                <input
                  type="text"
                  name="section"
                  value={studentInfo.section}
                  onChange={handleStudentInfoChange}
                  placeholder="___________________________"
                  className="w-full px-2 py-2 border-b-2 border-gray-400 focus:border-blue-600 focus:outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* Sections */}
          {assignment.sections.map((section, idx) => (
            <div key={idx} className="mb-8 page-break">
              {/* Section Header */}
              <div className="mb-6 pb-4 border-b-2 border-gray-300">
                <h2 className="text-2xl font-bold text-gray-900">
                  Section {section.section}
                </h2>
                <p className="text-sm text-gray-600 mt-1">{section.title}</p>
                <p className="text-sm text-gray-700 font-medium mt-2">
                  {section.instructions}
                </p>
              </div>

              {/* Questions */}
              <div className="space-y-6">
                {section.questions.map((question, qIdx) => (
                  <div key={qIdx} className="pl-4 border-l-4 border-blue-400">
                    {/* Question Number and Text */}
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-lg text-gray-900 font-semibold flex-1">
                        {qIdx + 1}. {question.text}
                      </p>
                      <div className="flex gap-2 ml-4">
                        {/* Difficulty Badge */}
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                            question.difficulty === "easy"
                              ? "bg-green-100 text-green-800"
                              : question.difficulty === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {question.difficulty.charAt(0).toUpperCase() +
                            question.difficulty.slice(1)}
                        </span>
                        {/* Marks */}
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-800 whitespace-nowrap">
                          {question.marks} marks
                        </span>
                      </div>
                    </div>

                    {/* Answer Space */}
                    <div className="mt-4">
                      {question.type === "essay" ? (
                        <>
                          <div className="h-24 border border-dashed border-gray-300 rounded p-2 bg-gray-50"></div>
                          <p className="text-xs text-gray-500 mt-1">
                            (Attach additional sheets if required)
                          </p>
                        </>
                      ) : question.type === "short-answer" ? (
                        <div className="h-12 border border-dashed border-gray-300 rounded p-2 bg-gray-50"></div>
                      ) : (
                        <>
                          <div className="space-y-2">
                            {["A", "B", "C", "D"].map((option) => (
                              <div
                                key={option}
                                className="flex items-center space-x-3"
                              >
                                <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
                                <span className="text-gray-700 font-medium">
                                  {option}.
                                </span>
                                <div className="flex-1 border-b border-gray-300"></div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Section Marks Total */}
              <div className="mt-6 text-right pr-4">
                <p className="text-sm font-semibold text-gray-700">
                  Section {section.section} Total Marks:{" "}
                  <span className="text-lg">
                    {section.questions.reduce((sum, q) => sum + q.marks, 0)}
                  </span>
                </p>
              </div>
            </div>
          ))}

          {/* Footer */}
          <div className="mt-8 pt-8 border-t-2 border-gray-300 text-center">
            <p className="text-sm text-gray-600">
              Total Marks:{" "}
              <span className="font-bold text-lg text-gray-900">
                {assignment.totalMarks}
              </span>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Generated on {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
