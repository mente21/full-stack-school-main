import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const Announcements = async () => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };

  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          { class: roleConditions[role as keyof typeof roleConditions] || {} },
        ],
      }),
    },
  });

  const colorSchemes = [
    {
      bg: "from-sky-50 to-sky-100/30",
      border: "border-lamaSky/30",
      title: "text-sky-700",
      badge: "bg-sky-100 text-sky-600"
    },
    {
      bg: "from-purple-50 to-purple-100/30",
      border: "border-lamaPurple/30",
      title: "text-purple-700",
      badge: "bg-purple-100 text-purple-600"
    },
    {
      bg: "from-amber-50 to-amber-100/30",
      border: "border-lamaYellow/30",
      title: "text-amber-700",
      badge: "bg-amber-100 text-amber-600"
    },
  ];

  return (
    <div className="glass-card p-5 rounded-2xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-lamaPurple to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-lg">📢</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Announcements</h1>
        </div>
        <span className="text-xs text-lamaSky hover:text-lamaPurple cursor-pointer transition-colors font-semibold hover:underline">
          View All
        </span>
      </div>
      <div className="flex flex-col gap-4 mt-5">
        {data.map((announcement, index) => {
          const scheme = colorSchemes[index % colorSchemes.length];
          return (
            <div
              key={announcement.id}
              className={`bg-gradient-to-r ${scheme.bg} border ${scheme.border} rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer group`}
            >
              <div className="flex items-center justify-between">
                <h2 className={`font-semibold ${scheme.title} group-hover:translate-x-1 transition-transform`}>
                  {announcement.title}
                </h2>
                <span className={`text-[10px] font-bold ${scheme.badge} px-2.5 py-1 rounded-full`}>
                  {new Intl.DateTimeFormat("en-GB").format(announcement.date)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{announcement.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Announcements;
