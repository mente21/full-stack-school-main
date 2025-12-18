"use client";

import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    income: 4000,
    expense: 2400,
  },
  {
    name: "Feb",
    income: 3000,
    expense: 1398,
  },
  {
    name: "Mar",
    income: 2000,
    expense: 9800,
  },
  {
    name: "Apr",
    income: 2780,
    expense: 3908,
  },
  {
    name: "May",
    income: 1890,
    expense: 4800,
  },
  {
    name: "Jun",
    income: 2390,
    expense: 3800,
  },
  {
    name: "Jul",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Aug",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Sep",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Oct",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Nov",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Dec",
    income: 3490,
    expense: 4300,
  },
];

const FinanceChart = () => {
  return (
    <div className="glass-card w-full h-full p-5 rounded-2xl shadow-soft hover:shadow-float transition-shadow duration-300">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-lg">💰</span>
          </div>
          <h1 className="text-lg font-bold text-gray-800">Finance</h1>
        </div>
        <div className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
          <Image src="/moreDark.png" alt="" width={18} height={18} className="opacity-50 hover:opacity-100" />
        </div>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis axisLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} tickLine={false} tickMargin={20} />
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
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="url(#colorIncome)"
            strokeWidth={4}
            dot={{ fill: "#38bdf8", strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, fill: "#38bdf8", strokeWidth: 2, stroke: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="url(#colorExpense)"
            strokeWidth={4}
            dot={{ fill: "#c084fc", strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, fill: "#c084fc", strokeWidth: 2, stroke: "#fff" }}
          />
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#e879f9" />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
