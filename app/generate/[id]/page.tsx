"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import QuestionDisplay from "@/app/components/QuestionDisplay";
import { GeneratedAssignment } from "@/app/store/assignmentStore";

export default function GeneratePage() {
  const router = useRouter();
  const params = useParams();
  const assignmentId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedAssignment, setGeneratedAssignment] =
    useState<GeneratedAssignment | null>(null);

  useEffect(() => {
    if (!assignmentId) return;

    const generateQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

        const assignmentResponse = await axios.get(
          `/api/assignments/${assignmentId}`,
        );
        const assignment = assignmentResponse.data.assignment;

        setGenerating(true);
        const generateResponse = await axios.post(
          `/api/assignments/${assignmentId}/generate`,
        );

        if (generateResponse.data.assignment.generatedContent) {
          setGeneratedAssignment({
            assignmentId: assignment._id,
            title: assignment.title,
            instructions:
              generateResponse.data.assignment.generatedContent.instructions,
            sections:
              generateResponse.data.assignment.generatedContent.sections,
            totalMarks:
              generateResponse.data.assignment.generatedContent.totalMarks,
            totalQuestions:
              generateResponse.data.assignment.generatedContent.totalQuestions,
          });
        }
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to generate questions");
      } finally {
        setLoading(false);
        setGenerating(false);
      }
    };

    generateQuestions();
  }, [assignmentId]);

  const handleRegenerate = async () => {
    try {
      setGenerating(true);
      setError(null);

      const response = await axios.post(
        `/api/assignments/${assignmentId}/generate`,
      );

      if (response.data.assignment.generatedContent) {
        setGeneratedAssignment({
          assignmentId: response.data.assignment._id,
          title: response.data.assignment.title,
          instructions: response.data.assignment.generatedContent.instructions,
          sections: response.data.assignment.generatedContent.sections,
          totalMarks: response.data.assignment.generatedContent.totalMarks,
          totalQuestions:
            response.data.assignment.generatedContent.totalQuestions,
        });
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to regenerate questions");
    } finally {
      setGenerating(false);
    }
  };

  if (loading || generating) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold">
            {loading ? "Loading assignment..." : "Generating questions..."}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <h2 className="text-red-600 font-bold text-xl mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!generatedAssignment) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <p className="text-gray-700 mb-6">No assignment was generated.</p>
          <button
            onClick={() => router.push("/")}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <QuestionDisplay
      assignment={generatedAssignment}
      onRegenerate={handleRegenerate}
    />
  );
}
