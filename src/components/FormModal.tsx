"use client";

import {
  deleteClass,
  deleteExam,
  deleteStudent,
  deleteSubject,
  deleteTeacher,
  deleteParent,
  deleteLesson,
  deleteAssignment,
  deleteResult,
  deleteAttendance,
  deleteEvent,
  deleteAnnouncement,
} from "@/lib/actions";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { FormContainerProps } from "./FormContainer";

const deleteActionMap = {
  subject: deleteSubject,
  class: deleteClass,
  teacher: deleteTeacher,
  student: deleteStudent,
  exam: deleteExam,
  parent: deleteParent,
  lesson: deleteLesson,
  assignment: deleteAssignment,
  result: deleteResult,
  attendance: deleteAttendance,
  event: deleteEvent,
  announcement: deleteAnnouncement,
};

// USE LAZY LOADING

// import TeacherForm from "./forms/TeacherForm";
// import StudentForm from "./forms/StudentForm";

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <div className="flex items-center justify-center py-8"><div className="w-8 h-8 border-4 border-lamaSky border-t-transparent rounded-full animate-spin"></div></div>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <div className="flex items-center justify-center py-8"><div className="w-8 h-8 border-4 border-lamaSky border-t-transparent rounded-full animate-spin"></div></div>,
});
const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => <div className="flex items-center justify-center py-8"><div className="w-8 h-8 border-4 border-lamaSky border-t-transparent rounded-full animate-spin"></div></div>,
});
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => <div className="flex items-center justify-center py-8"><div className="w-8 h-8 border-4 border-lamaSky border-t-transparent rounded-full animate-spin"></div></div>,
});
const ExamForm = dynamic(() => import("./forms/ExamForm"), {
  loading: () => <div className="flex items-center justify-center py-8"><div className="w-8 h-8 border-4 border-lamaSky border-t-transparent rounded-full animate-spin"></div></div>,
});
const ParentForm = dynamic(() => import("./forms/ParentForm"), {
  loading: () => <div className="flex items-center justify-center py-8"><div className="w-8 h-8 border-4 border-lamaSky border-t-transparent rounded-full animate-spin"></div></div>,
});
const LessonForm = dynamic(() => import("./forms/LessonForm"), {
  loading: () => <div className="flex items-center justify-center py-8"><div className="w-8 h-8 border-4 border-lamaSky border-t-transparent rounded-full animate-spin"></div></div>,
});
const EventForm = dynamic(() => import("./forms/EventForm"), {
  loading: () => <div className="flex items-center justify-center py-8"><div className="w-8 h-8 border-4 border-lamaSky border-t-transparent rounded-full animate-spin"></div></div>,
});
const AnnouncementForm = dynamic(() => import("./forms/AnnouncementForm"), {
  loading: () => <div className="flex items-center justify-center py-8"><div className="w-8 h-8 border-4 border-lamaSky border-t-transparent rounded-full animate-spin"></div></div>,
});
const AssignmentForm = dynamic(() => import("./forms/AssignmentForm"), {
  loading: () => <div className="flex items-center justify-center py-8"><div className="w-8 h-8 border-4 border-lamaSky border-t-transparent rounded-full animate-spin"></div></div>,
});
const ResultForm = dynamic(() => import("./forms/ResultForm"), {
  loading: () => <div className="flex items-center justify-center py-8"><div className="w-8 h-8 border-4 border-lamaSky border-t-transparent rounded-full animate-spin"></div></div>,
});
const AttendanceForm = dynamic(() => import("./forms/AttendanceForm"), {
  loading: () => <div className="flex items-center justify-center py-8"><div className="w-8 h-8 border-4 border-lamaSky border-t-transparent rounded-full animate-spin"></div></div>,
});
// TODO: OTHER FORMS

const forms: {
  [key: string]: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
    relatedData?: any
  ) => JSX.Element;
} = {
  subject: (setOpen, type, data, relatedData) => (
    <SubjectForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  class: (setOpen, type, data, relatedData) => (
    <ClassForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  teacher: (setOpen, type, data, relatedData) => (
    <TeacherForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  student: (setOpen, type, data, relatedData) => (
    <StudentForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  exam: (setOpen, type, data, relatedData) => (
    <ExamForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  parent: (setOpen, type, data, relatedData) => (
    <ParentForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  lesson: (setOpen, type, data, relatedData) => (
    <LessonForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  event: (setOpen, type, data, relatedData) => (
    <EventForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  announcement: (setOpen, type, data, relatedData) => (
    <AnnouncementForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  assignment: (setOpen, type, data, relatedData) => (
    <AssignmentForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  result: (setOpen, type, data, relatedData) => (
    <ResultForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  attendance: (setOpen, type, data, relatedData) => (
    <AttendanceForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  // TODO OTHER LIST ITEMS
};

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
}: FormContainerProps & { relatedData?: any }) => {
  const size = type === "create" ? "w-9 h-9" : "w-8 h-8";
  const bgColor =
    type === "create"
      ? "bg-gradient-to-br from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600"
      : type === "update"
        ? "bg-gradient-to-br from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600"
        : "bg-gradient-to-br from-rose-400 to-red-500 hover:from-rose-500 hover:to-red-600";

  const [open, setOpen] = useState(false);

  const Form = () => {
    const [state, formAction] = useFormState(deleteActionMap[table], {
      success: false,
      error: false,
    });

    const router = useRouter();

    useEffect(() => {
      if (state.success) {
        toast(`${table} has been deleted!`);
        setOpen(false);
        router.refresh();
      }
    }, [state, router]);

    return type === "delete" && id ? (
      <form action={formAction} className="p-6 flex flex-col gap-6">
        <input type="text | number" name="id" value={id} hidden />
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">⚠️</span>
          </div>
          <span className="text-center font-medium text-gray-700 text-lg">
            Are you sure you want to delete this {table}?
          </span>
          <span className="text-sm text-gray-500">This action cannot be undone.</span>
        </div>
        <div className="flex gap-3 justify-center">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-medium hover:from-red-600 hover:to-rose-600 transition-all shadow-lg hover:shadow-xl">
            Delete
          </button>
        </div>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](setOpen, type, data, relatedData)
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-xl ${bgColor} shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} className="brightness-0 invert" />
      </button>
      {open && (
        <div className="w-screen h-screen fixed left-0 top-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] text-gray-700 shadow-2xl max-h-[90vh] overflow-y-auto animate-[slideUp_0.3s_ease-out]">
            <Form />
            <button
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition-all hover:rotate-90 duration-300"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={12} height={12} className="opacity-60" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
