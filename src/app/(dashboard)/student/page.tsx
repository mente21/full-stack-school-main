import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import BigCalendar from "@/components/BigCalender";
import EventCalendar from "@/components/EventCalendar";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const StudentPage = async () => {
  const { userId } = await auth();

  const classItem = await prisma.class.findMany({
    where: {
      students: { some: { id: userId! } },
    },
  });

  console.log(classItem);
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-lamaSky to-lamaPurple rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-xl">📅</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">
              Schedule ({classItem[0]?.name || "4A"})
            </h1>
          </div>
          {classItem.length > 0 ? (
            <BigCalendarContainer type="classId" id={classItem[0].id} />
          ) : (
            <div className="flex items-center justify-center h-[400px] text-gray-400 font-medium italic">
              Class not found
            </div>
          )}
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
