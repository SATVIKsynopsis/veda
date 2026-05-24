"use client";

import Sidebar from "@/app/components/Sidebar";
import TopBar from "@/app/components/TopBar";
import AssignmentForm from "@/app/components/AssignmentForm";

export default function CreatePage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-64 flex-1 flex flex-col">
        <TopBar />

        <div className="flex-1 overflow-auto bg-gray-50 p-8">
          <AssignmentForm />
        </div>
      </div>
    </div>
  );
}
