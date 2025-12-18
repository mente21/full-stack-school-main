"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Image from "next/image";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  const router = useRouter();

  useEffect(() => {
    if (value instanceof Date) {
      router.push(`?date=${value}`);
    }
  }, [value, router]);

  return (
    <div className="glass-card p-5 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-lamaSky to-lamaPurple rounded-xl flex items-center justify-center shadow-lg">
            <Image src="/calendar.png" alt="" width={20} height={20} className="brightness-0 invert" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">Events</h1>
        </div>
        <div className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
          <Image src="/moreDark.png" alt="" width={18} height={18} className="opacity-50 hover:opacity-100" />
        </div>
      </div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
};

export default EventCalendar;
