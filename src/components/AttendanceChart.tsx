"use client";
import Image from "next/image";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AttendanceChart = ({
  data,
}: {
  data: { name: string; present: number; absent: number }[];
}) => {
  return (
    <div className="glass-card w-full h-full p-5 rounded-2xl shadow-soft hover:shadow-float transition-shadow duration-300">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-lg">📊</span>
          </div>
          <h1 className="text-lg font-bold text-gray-800">Attendance</h1>
        </div>
        <div className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
          <Image src="/moreDark.png" alt="" width={18} height={18} className="opacity-50 hover:opacity-100" />
        </div>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={data} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            tickLine={false}
          />
          <YAxis axisLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} tickLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(8px)",
              color: "#374151",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
            }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
          />
          <Bar
            dataKey="present"
            fill="url(#colorPresent)"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="absent"
            fill="url(#colorAbsent)"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
          <defs>
            <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="colorAbsent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
