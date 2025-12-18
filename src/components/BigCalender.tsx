"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const localizer = momentLocalizer(moment);

const BigCalendar = ({
  data,
}: {
  data: { title: string; start: Date; end: Date }[];
}) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  const eventPropGetter = (event: any) => {
    // Generate a consistent color based on title hash
    const colors = [
      { bg: 'rgba(56, 189, 248, 0.1)', border: '#38bdf8' },
      { bg: 'rgba(207, 102, 255, 0.1)', border: '#cf66ff' },
      { bg: 'rgba(250, 204, 21, 0.1)', border: '#facc15' },
      { bg: 'rgba(244, 63, 94, 0.1)', border: '#f43f5e' },
      { bg: 'rgba(34, 197, 94, 0.1)', border: '#22c55e' },
    ];

    let hash = 0;
    for (let i = 0; i < event.title.length; i++) {
      hash = event.title.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    const color = colors[index];

    return {
      style: {
        backgroundColor: color.bg,
        borderLeft: `4px solid ${color.border}`,
        borderRadius: '8px',
        color: '#1e293b',
        fontSize: '12px',
        fontWeight: '600',
        padding: '4px 8px',
        margin: '1px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      } as React.CSSProperties
    };
  };

  return (
    <Calendar
      localizer={localizer}
      events={data}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: "98%" }}
      onView={handleOnChangeView}
      min={new Date(2025, 1, 0, 8, 0, 0)}
      max={new Date(2025, 1, 0, 18, 0, 0)}
      eventPropGetter={eventPropGetter}
      dayLayoutAlgorithm="overlap"
      components={{
        event: ({ event }: any) => (
          <div className="flex items-center justify-between gap-2 h-full w-full overflow-hidden p-1 select-none" title={event.title}>
            <span className="font-bold text-[10px] lg:text-[11px] truncate uppercase flex-1">
              {event.title}
            </span>
            <span className="text-[9px] opacity-80 whitespace-nowrap hidden sm:inline">
              {moment(event.start).format("HH:mm")}
            </span>
          </div>
        )
      }}
    />
  );
};

export default BigCalendar;
