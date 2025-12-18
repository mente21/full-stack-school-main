import Image from "next/image";
import CountChart from "./CountChart";
import prisma from "@/lib/prisma";

const CountChartContainer = async () => {
  const data = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
  });

  const boys = data.find((d) => d.sex === "MALE")?._count || 0;
  const girls = data.find((d) => d.sex === "FEMALE")?._count || 0;

  return (
    <div className="glass-card w-full h-full p-5 rounded-2xl shadow-soft hover:shadow-float transition-shadow duration-300">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-lamaSky to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-lg">👨‍🎓</span>
          </div>
          <h1 className="text-lg font-bold text-gray-800">Students</h1>
        </div>
        <div className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
          <Image src="/moreDark.png" alt="" width={18} height={18} className="opacity-50 hover:opacity-100" />
        </div>
      </div>
      {/* CHART */}
      <CountChart boys={boys} girls={girls} />
      {/* BOTTOM */}
      <div className="flex justify-center gap-12">
        <div className="flex flex-col gap-1.5 items-center group cursor-pointer">
          <div className="w-6 h-6 bg-gradient-to-br from-lamaSky to-cyan-400 rounded-full shadow-lg group-hover:scale-110 transition-transform" />
          <h1 className="font-bold text-gray-800 text-lg">{boys}</h1>
          <h2 className="text-xs text-gray-500 font-medium">
            Boys ({Math.round((boys / (boys + girls)) * 100)}%)
          </h2>
        </div>
        <div className="flex flex-col gap-1.5 items-center group cursor-pointer">
          <div className="w-6 h-6 bg-gradient-to-br from-lamaYellow to-orange-400 rounded-full shadow-lg group-hover:scale-110 transition-transform" />
          <h1 className="font-bold text-gray-800 text-lg">{girls}</h1>
          <h2 className="text-xs text-gray-500 font-medium">
            Girls ({Math.round((girls / (boys + girls)) * 100)}%)
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CountChartContainer;
