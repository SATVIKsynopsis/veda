"use client";

import {
  Bell,
  ChevronDown,
  Clock3,
  FileText,
  Grid2X2,
  Home,
  Settings,
  Users,
  Search,
  Funnel,
  Check,
  CloudUpload,
} from "lucide-react";
import { useState } from "react";
import * as Select from "@radix-ui/react-select";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

import { LogOut } from "lucide-react";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const router = useRouter();

  const [subject, setSubject] = useState("Science");

  const [className, setClassName] = useState("5th");

  const [duration, setDuration] = useState("45 minutes");

  const [totalMarks, setTotalMarks] = useState(20);
  const [topic, setTopic] = useState("");

  const [additionalInstructions, setAdditionalInstructions] = useState(
    "Use CBSE style formatting",
  );
  const [showCreatePage, setShowCreatePage] = useState(false);
  const [generatedPaper, setGeneratedPaper] = useState("");
  const [showGeneratedPaper, setShowGeneratedPaper] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const [questionTypes, setQuestionTypes] = useState([
    {
      type: "Multiple Choice Questions",
      count: 2,
      marks: 5,
    },
    {
      type: "Short Questions",
      count: 3,
      marks: 5,
    },
    {
      type: "Diagram/Graph-Based Questions",
      count: 4,
      marks: 5,
    },
    {
      type: "Numerical Problems",
      count: 5,
      marks: 5,
    },
  ]);

  const calculatedTotalMarks = questionTypes.reduce(
    (acc, item) => acc + item.count * item.marks,
    0,
  );

  const generatePaper = async () => {
    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate-paper", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          className,
          subject,
          topic,
          totalMarks,
          duration,
          questionTypes,
          additionalInstructions,
        }),
      });

      const data = await response.json();

      setGeneratedPaper(data.paper);

      setShowGeneratedPaper(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsGenerating(false);
    }
  };
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("veda_user") || "{}")
      : {};

  const logout = () => {
    localStorage.removeItem("veda_user");

    router.push("/login");
  };

  const downloadPDF = async () => {
    const response = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        paper: generatedPaper,

        subject,

        className,

        duration,

        totalMarks: calculatedTotalMarks,

        schoolName: user?.schoolName,

        schoolAddress: user?.schoolAddress,
      }),
    });

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "question-paper.pdf";

    a.click();
  };

  return (
    <div className="h-screen overflow-hidden bg-[#F4F4F4] p-[16px] flex gap-[16px]">
      <aside className="relative flex w-[270px] flex-col justify-between bg-[#FAFAFA] px-4 py-4 border border-[#E8E8E8] rounded-[24px] shadow-[12px_0_24px_rgba(0,0,0,0.05)]">
        <div className="pointer-events-none absolute right-0 top-0 h-full w-[26px] bg-black/5 blur-2xl opacity-40" />

        <div>
          <div className="flex items-center gap-3 px-2">
            <img
              src="/logo 2.png"
              alt="VedaAI Logo"
              className="h-[70px] w-[70px] object-contain shrink-0 mt-6"
            />

            <h1 className="text-[34px] font-semibold tracking-[-2px] text-[#1F1F1F] leading-none mr-3">
              VedaAI
            </h1>
          </div>

          <button
            className="relative mt-10 h-[54px] w-full overflow-hidden rounded-full border-[4px] border-[#F47C5C] bg-[#232323] shadow-[0_8px_30px_rgba(244,124,92,0.28)]"
            onClick={() => setShowCreatePage(true)}
          >
            <div className="absolute inset-0 rounded-full border border-[#FF7A59]" />

            <div className="absolute inset-0 rounded-full shadow-[0_0_18px_rgba(255,122,89,0.65)]" />

            <div className="absolute inset-[1px] rounded-full border border-white/10" />

            <span className="relative z-10 flex h-full items-center justify-center text-[15px] font-medium text-white">
              ✦ Create Assignment
            </span>
          </button>

          <div className="mt-10 space-y-[6px]">
            <Link href="/home">
              <SidebarItem icon={<Home size={18} />} label="Home" />
            </Link>

            <Link href="/my-groups">
              <SidebarItem icon={<Users size={18} />} label="My Groups" />
            </Link>

            <SidebarItem
              active
              icon={<FileText size={18} />}
              label="Assignments"
            />

            <Link href="ai-toolkit">
              <SidebarItem
                icon={<Grid2X2 size={18} />}
                label="AI Teacher's Toolkit"
              />
            </Link>

            <Link href="library">
              <SidebarItem icon={<Clock3 size={18} />} label="My Library" />
            </Link>
          </div>
        </div>

        <div>
          <button className="mb-5 flex items-center gap-2 px-3 text-[15px] text-[#7B7B7B]">
            <Settings size={16} />
            Settings
          </button>

          <div className="flex items-center gap-3 rounded-[18px] bg-[#F3F3F3] p-3 border border-[#E8E8E8] shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
            <img
              src="https://i.pravatar.cc/100?img=12"
              alt="school"
              className="h-[48px] w-[48px] rounded-full object-cover"
            />

            <div>
              <h3 className="text-[15px] font-semibold leading-none text-[#1F1F1F]">
                {user?.schoolName || "Delhi Public School"}
              </h3>

              <p className="mt-1 text-[13px] text-[#8B8B8B]">
                {user?.schoolAddress || "Bokaro Steel City"}
              </p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col gap-[14px]">
        <div className="rounded-[16px] border border-[#ECECEC] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)] pl-6 pr-3 h-[56px] flex items-center justify-between gap-[10px]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="text-[20px] text-[#444444]"
            >
              ←
            </button>
            <div className="flex items-center gap-2">
              <Grid2X2 size={14} className="text-[#B5B5B5]" />

              <span className="text-[14px] font-medium text-[#A1A1A1]">
                Assignment
              </span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative outline-none">
                  <Bell size={18} className="text-[#2B2B2B]" />

                  <span className="absolute -right-[1px] -top-[1px] h-[7px] w-[7px] rounded-full bg-[#FF7A59]" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-[320px] rounded-2xl border border-[#ECECEC] p-0 shadow-xl"
              >
                <div className="border-b border-[#F1F1F1] px-5 py-4">
                  <h3 className="text-[15px] font-semibold text-[#232323]">
                    Notifications
                  </h3>
                </div>

                <div className="space-y-3 p-4">
                  <div className="rounded-2xl bg-[#FAFAFA] p-4">
                    <p className="text-[14px] font-medium text-[#232323]">
                      Assignment generated successfully
                    </p>

                    <p className="mt-1 text-[13px] text-[#8B8B8B]">
                      Your AI paper is ready to download.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#FAFAFA] p-4"></div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex cursor-pointer items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/100?img=5"
                    alt="avatar"
                    className="h-[36px] w-[36px] rounded-full object-cover"
                  />

                  <span className="text-[15px] font-medium text-[#2B2B2B]">
                    {user?.name || "John Doe"}
                  </span>

                  <ChevronDown size={16} className="text-[#9B9B9B]" />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-[180px] rounded-2xl border border-[#ECECEC] p-2 shadow-lg"
              >
                <DropdownMenuItem
                  onClick={logout}
                  className="flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-[#E5484D] focus:bg-[#F8F8F8]"
                >
                  <LogOut size={16} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-stretch justify-start px-4 py-4 overflow-auto">
          {showGeneratedPaper ? (
            <div className="w-full px-6 py-4">
              <div className="rounded-[28px] bg-[#232323] p-6 text-white">
                <p className="text-[16px] leading-[30px]">
                  Certainly! Here are customized Question Papers and Answer Keys
                  tailored to your specifications.
                </p>

                <button
                  onClick={downloadPDF}
                  className="mt-5 rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-black"
                >
                  Download PDF
                </button>
              </div>

              <div className="w-full px-6 py-4">
                <div className="mt-6 rounded-[32px] bg-white p-14">
                  <div className="text-center">
                    <h1 className="text-[34px] font-semibold tracking-[-1px] text-[#232323]">
                      {user?.schoolName || "Delhi Public School"}
                    </h1>

                    <p className="mt-2 text-[16px] text-[#7B7B7B]">
                      {user?.schoolAddress || "Bokaro Steel City"}
                    </p>

                    <p className="mt-4 text-[19px] font-medium text-[#2F2F2F]">
                      Subject: {subject}
                    </p>

                    <p className="mt-2 text-[18px] text-[#4B4B4B]">
                      Class: {className}
                    </p>
                  </div>

                  <div className="mt-10 flex items-center justify-between text-[16px] font-medium text-[#232323]">
                    <p>Time Allowed: {duration}</p>

                    <p>Maximum Marks: {calculatedTotalMarks}</p>
                  </div>

                  <p className="mt-8 text-[15px] text-[#3A3A3A]">
                    All questions are compulsory unless stated otherwise.
                  </p>

                  <div className="mt-10 space-y-5 text-[15px] text-[#232323]">
                    <p>Name: _____________________________</p>

                    <p>Roll Number: ______________________</p>

                    <p>Class & Section: ___________________</p>
                  </div>

                  <div className="mt-12 text-[15px] leading-[30px] text-[#232323]">
                    {generatedPaper
                      .replace(/\n{3,}/g, "\n\n")
                      .split("\n")
                      .map((line, index) => {
                        const isSection =
                          line.includes("SECTION A") ||
                          line.includes("SECTION B") ||
                          line.includes("SECTION C") ||
                          line.includes("ANSWER KEY");

                        return (
                          <p
                            key={index}
                            className={
                              isSection
                                ? "text-center font-semibold my-8 text-[20px]"
                                : "whitespace-pre-wrap"
                            }
                          >
                            {line}
                          </p>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          ) : showCreatePage ? (
            <div className="w-full">
              <div className="flex items-start gap-3">
                <div className="mt-[14px] h-[10px] w-[10px] rounded-full bg-[#5AD46A]" />

                <div>
                  <h2 className="text-[28px] font-semibold tracking-[-0.5px] text-[#1F1F1F]">
                    Create Assignment
                  </h2>

                  <p className="mt-1 text-[13px] text-[#A5A5A5]">
                    Set up a new assignment for your students
                  </p>
                </div>
              </div>

              <div className="mt-7 flex items-center gap-3 px-20">
                <div className="h-[4px] flex-1 rounded-full bg-[#3A3A3A]" />
                <div className="h-[4px] flex-1 rounded-full bg-[#D9D9D9]" />
              </div>

              <div className="mx-auto mt-6 max-w-[760px] rounded-[32px] border border-[#ECECEC] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                <h3 className="text-[24px] font-semibold text-[#1F1F1F]">
                  Assignment Details
                </h3>

                <p className="mt-1 text-[13px] text-[#A5A5A5]">
                  Basic information about your assignment
                </p>

                {!manualMode ? (
                  <>
                    <div className="mt-6 rounded-[24px] border-2 border-dashed border-[#E3E3E3] p-10 text-center">
                      {uploadedFile ? (
                        <img
                          src={uploadedFile}
                          alt="Uploaded"
                          className="mx-auto max-h-[320px] rounded-[18px] object-contain"
                        />
                      ) : (
                        <>
                          <CloudUpload
                            className="mx-auto text-[#2F2F2F]"
                            size={42}
                          />

                          <p className="mt-4 text-[15px] font-medium text-[#3B3B3B]">
                            Choose a file or drag & drop it here
                          </p>

                          <p className="mt-1 text-[12px] text-[#A9A9A9]">
                            JPEG, PNG, upto 10MB
                          </p>

                          <label
                            htmlFor="fileUpload"
                            className="mt-5 inline-block cursor-pointer rounded-full bg-[#F3F3F3] px-6 py-[10px] text-[13px] font-semibold text-[#4A4A4A] shadow-sm"
                          >
                            Browse Files
                          </label>

                          <input
                            id="fileUpload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];

                              if (!file) return;

                              const imageUrl = URL.createObjectURL(file);

                              setUploadedFile(imageUrl);
                            }}
                          />
                        </>
                      )}
                    </div>

                    <p className="mt-3 text-center text-[15px] font-medium text-[#8A8A8A]">
                      Upload images of your preferred document/image
                    </p>
                  </>
                ) : (
                  <>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Subject"
                        className="
    h-[52px]
    rounded-[16px]
    border border-[#ECECEC]
    px-4
    text-[15px]
    text-[#3A3A3A]
    placeholder:text-[#7B7B7B]
    outline-none
  "
                      />

                      <input
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        placeholder="Class"
                        className="
    h-[52px]
    rounded-[16px]
    border border-[#ECECEC]
    px-4
    text-[15px]
    text-[#3A3A3A]
    placeholder:text-[#7B7B7B]
    outline-none
  "
                      />
                      <input
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Topic / Chapter"
                        className="
    h-[52px]
    rounded-[16px]
    border border-[#ECECEC]
    px-4
    text-[15px]
    text-[#3A3A3A]
    placeholder:text-[#7B7B7B]
    outline-none
  "
                      />

                      <select
                        className="
    h-[52px]
    rounded-[16px]
    border border-[#ECECEC]
    px-4
    text-[15px]
    text-[#3A3A3A]
    outline-none
  "
                      >
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                      </select>
                    </div>
                  </>
                )}

                <div className="mt-5 flex justify-center">
                  <button
                    onClick={() => setManualMode(!manualMode)}
                    className="
      rounded-full
      border border-[#E5E5E5]
      bg-white
      px-5 py-2
      text-[14px]
      font-medium
      text-[#3A3A3A]
    "
                  >
                    {manualMode ? "Switch to Upload" : "Configure Manually"}
                  </button>
                </div>

                <div className="mt-6">
                  <p className="mb-2 text-[14px] font-semibold text-[#1F1F1F]">
                    Due Date
                  </p>

                  <input
                    placeholder="DD-MM-YYYY"
                    className="h-[52px] w-full rounded-[16px] border border-[#ECECEC] px-4 outline-none placeholder:text-[#8F8F8F] placeholder:font-medium"
                  />
                </div>

                <div className="mt-6">
                  <div className="mb-3 grid grid-cols-[1fr_140px_100px] items-center px-2">
                    <p className="text-[16px] font-semibold text-[#3A3A3A]">
                      Question Type
                    </p>

                    <p className="text-center text-[16px] font-semibold text-[#3A3A3A]">
                      No. of Questions
                    </p>

                    <p className="text-center text-[16px] font-semibold text-[#3A3A3A]">
                      Marks
                    </p>
                  </div>

                  {questionTypes.map((item, i) => (
                    <div
                      key={i}
                      className="mb-3 grid grid-cols-[1fr_140px_100px] items-center gap-4"
                    >
                      <Select.Root
                        value={item.type}
                        onValueChange={(value) => {
                          const updated = [...questionTypes];
                          updated[i].type = value;
                          setQuestionTypes(updated);
                        }}
                      >
                        <Select.Trigger
                          className="
      flex h-[48px] w-full items-center justify-between
      rounded-full border border-[#ECECEC]
      bg-[#F8F8F8]
      px-5
      text-[14px] font-medium text-[#3A3A3A]
      outline-none
      transition-all duration-200
      hover:border-[#D8D8D8]
      data-[state=open]:border-[#D0D0D0]
    "
                        >
                          <Select.Value />

                          <Select.Icon>
                            <ChevronDown size={18} className="text-[#6F6F6F]" />
                          </Select.Icon>
                        </Select.Trigger>

                        <Select.Portal>
                          <Select.Content
                            position="popper"
                            sideOffset={8}
                            className="
        z-50 overflow-hidden rounded-2xl
        border border-[#ECECEC]
        bg-white
        shadow-[0_8px_30px_rgba(0,0,0,0.08)]
        animate-in fade-in zoom-in-95
      "
                          >
                            <Select.Viewport className="p-2">
                              {[
                                "Multiple Choice Questions",
                                "Short Questions",
                                "Diagram/Graph-Based Questions",
                                "Numerical Problems",
                                "Long Questions",
                              ].map((option) => (
                                <Select.Item
                                  key={option}
                                  value={option}
                                  className="
              relative flex cursor-pointer select-none
              items-center rounded-xl
              px-4 py-3
              text-[14px] font-medium text-[#3A3A3A]
              outline-none
              transition-colors duration-150
              hover:bg-[#F4F4F4]
              focus:bg-[#F4F4F4]
            "
                                >
                                  <Select.ItemText>{option}</Select.ItemText>

                                  <Select.ItemIndicator className="absolute right-4">
                                    <Check size={16} />
                                  </Select.ItemIndicator>
                                </Select.Item>
                              ))}
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                      <div className="flex h-[48px] items-center justify-between rounded-full border border-[#ECECEC] bg-[#F8F8F8] px-4">
                        <button
                          onClick={() => {
                            const updated = [...questionTypes];
                            if (updated[i].count > 1) {
                              updated[i].count -= 1;
                              setQuestionTypes(updated);
                            }
                          }}
                          className="text-[18px] text-[#8D8D8D]"
                        >
                          −
                        </button>

                        <span className="text-[15px] font-semibold text-[#3A3A3A]">
                          {item.count}
                        </span>

                        <button
                          onClick={() => {
                            const updated = [...questionTypes];
                            updated[i].count += 1;
                            setQuestionTypes(updated);
                          }}
                          className="text-[18px] text-[#8D8D8D]"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex h-[48px] items-center justify-between rounded-full border border-[#ECECEC] bg-[#F8F8F8] px-4">
                        <button
                          onClick={() => {
                            const updated = [...questionTypes];
                            if (updated[i].marks > 1) {
                              updated[i].marks -= 1;
                              setQuestionTypes(updated);
                            }
                          }}
                          className="text-[18px] text-[#8D8D8D]"
                        >
                          −
                        </button>

                        <span className="text-[15px] font-semibold text-[#3A3A3A]">
                          {item.marks}
                        </span>

                        <button
                          onClick={() => {
                            const updated = [...questionTypes];
                            updated[i].marks += 1;
                            setQuestionTypes(updated);
                          }}
                          className="text-[18px] text-[#8D8D8D]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => {
                      setQuestionTypes([
                        ...questionTypes,
                        {
                          type: "Long Questions",
                          count: 1,
                          marks: 5,
                        },
                      ]);
                    }}
                    className="mt-2 flex items-center gap-2"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#232323] text-white">
                      +
                    </div>

                    <span className="text-[14px] font-medium text-[#3A3A3A]">
                      Add Question Type
                    </span>
                  </button>

                  <div className="mt-6 flex flex-col items-end text-[14px] font-semibold text-[#3A3A3A]">
                    <p>
                      Total Questions :{" "}
                      {questionTypes.reduce((acc, item) => acc + item.count, 0)}
                    </p>

                    <p className="mt-1">
                      Total Marks :{" "}
                      {questionTypes.reduce(
                        (acc, item) => acc + item.count * item.marks,
                        0,
                      )}
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="mb-2 text-[14px] font-semibold text-[#1F1F1F]">
                    Additional Information (For better output)
                  </p>

                  <textarea
                    value={additionalInstructions}
                    onChange={(e) => setAdditionalInstructions(e.target.value)}
                  />
                </div>
              </div>

              <div className="mx-auto mt-6 flex max-w-[760px] items-center justify-between">
                <button
                  onClick={() => setShowCreatePage(false)}
                  className="rounded-full bg-white px-6 py-3 text-[14px] font-medium shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                >
                  ← Previous
                </button>

                <button
                  className="flex items-center gap-2 rounded-full bg-black px-6 py-3 text-[14px] font-medium text-white disabled:opacity-70"
                  onClick={generatePaper}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Processing...
                    </>
                  ) : (
                    <>Next →</>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col">
              <div className="mb-4">
                <div className="flex items-start gap-3">
                  <div className="mt-[14px] h-[10px] w-[10px] rounded-full bg-[#5AD46A]" />

                  <div>
                    <h2 className="text-[28px] font-semibold tracking-[-0.5px] text-[#1F1F1F]">
                      Assignments
                    </h2>

                    <p className="mt-1 text-[13px] text-[#A5A5A5]">
                      Manage and create assignments for your classes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 items-center justify-center">
                <div className="flex flex-col items-center">
                  <img
                    src="/Illustrations.png"
                    alt="No assignments"
                    className="h-[220px] w-[220px] object-contain"
                  />

                  <h2 className="mt-8 text-[34px] font-semibold tracking-[-1px] text-[#232323]">
                    No assignments yet
                  </h2>

                  <p className="mt-3 max-w-[560px] text-center text-[17px] leading-[30px] text-[#8B8B8B]">
                    Create your first assignment to start collecting and grading
                    student submissions. You can set up rubrics, define marking
                    criteria, and let AI assist with grading.
                  </p>

                  <button
                    onClick={() => setShowCreatePage(true)}
                    className="mt-8 rounded-full bg-[#1F1F1F] px-8 py-4 text-[15px] font-medium text-white transition hover:opacity-90"
                  >
                    + Create Your First Assignment
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex h-[44px] w-full items-center gap-3 rounded-[12px] px-4 text-[15px] transition-all duration-200 ${
        active
          ? "bg-[#EFEFEF] font-medium text-[#222222]"
          : "text-[#8B8B8B] hover:bg-[#F3F3F3]"
      }`}
    >
      {icon}

      <span>{label}</span>
    </button>
  );
}
