import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";


const ParentPage = async () => {
  const { userId } = await auth();
  const currentUserId = userId;

  const students = await prisma.student.findMany({
    where: {
      parentId: currentUserId!,
    },
  });

  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      <div className="flex-1 flex flex-col gap-8">
        {students.map((student) => (
          <div className="w-full xl:w-2/3" key={student.id}>
            <div className="h-full glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-lamaSky to-lamaPurple rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-xl">📅</span>
                </div>
                <h1 className="text-xl font-bold text-gray-800">
                  Schedule ({student.name + " " + student.surname})
                </h1>
              </div>
              <BigCalendarContainer type="classId" id={student.classId} />
            </div>
          </div>
        ))}
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default ParentPage;
