import prisma from "@/lib/prisma";
import Image from "next/image";

const UserCard = async ({
  type,
}: {
  type: "admin" | "teacher" | "student" | "parent";
}) => {
  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  };

  const gradientMap: Record<typeof type, string> = {
    admin: "from-violet-600 via-purple-500 to-fuchsia-500",
    teacher: "from-amber-500 via-orange-400 to-yellow-400",
    student: "from-sky-500 via-blue-400 to-cyan-400",
    parent: "from-rose-500 via-pink-400 to-red-400",
  };

  const iconBgMap: Record<typeof type, string> = {
    admin: "bg-purple-400/30",
    teacher: "bg-amber-400/30",
    student: "bg-sky-400/30",
    parent: "bg-rose-400/30",
  };

  const data = await modelMap[type].count();

  return (
    <div className={`bg-gradient-to-br ${gradientMap[type]} rounded-2xl p-5 flex-1 min-w-[140px] shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer text-white hover:-translate-y-2 hover:scale-[1.02] relative overflow-hidden group shimmer-hover`}>
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12 group-hover:scale-150 transition-transform duration-700"></div>

      <div className="flex justify-between items-center z-10 relative">
        <span className="text-[10px] bg-white/90 px-3 py-1.5 rounded-full text-gray-700 font-bold shadow-sm backdrop-blur-sm">
          2024/25
        </span>
        <div className={`${iconBgMap[type]} p-2 rounded-full backdrop-blur-sm`}>
          <Image src="/more.png" alt="" width={16} height={16} className="brightness-0 invert opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
        </div>
      </div>

      <h1 className="text-4xl font-bold my-4 text-white drop-shadow-lg z-10 relative tracking-tight">
        {data.toLocaleString()}
      </h1>

      <h2 className="capitalize text-sm font-semibold text-white/90 z-10 relative flex items-center gap-2">
        <span className="w-2 h-2 bg-white/80 rounded-full animate-pulse"></span>
        {type}s
      </h2>
    </div>
  );
};

export default UserCard;
