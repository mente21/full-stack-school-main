import prisma from "@/lib/prisma";

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
  const date = dateParam ? new Date(dateParam) : new Date();

  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });

  const colorSchemes = [
    { bg: "from-sky-50 to-sky-100/50", border: "border-l-lamaSky", text: "text-sky-700", time: "bg-sky-100 text-sky-600" },
    { bg: "from-purple-50 to-purple-100/50", border: "border-l-lamaPurple", text: "text-purple-700", time: "bg-purple-100 text-purple-600" },
    { bg: "from-amber-50 to-amber-100/50", border: "border-l-lamaYellow", text: "text-amber-700", time: "bg-amber-100 text-amber-600" },
    { bg: "from-rose-50 to-rose-100/50", border: "border-l-[#f43f5e]", text: "text-rose-700", time: "bg-rose-100 text-rose-600" },
  ];

  return data.map((event, index) => {
    const scheme = colorSchemes[index % colorSchemes.length];
    return (
      <div
        className={`p-4 rounded-xl bg-gradient-to-r ${scheme.bg} border-l-4 ${scheme.border} hover:shadow-md transition-all duration-300 hover:-translate-x-1 cursor-pointer group`}
        key={event.id}
      >
        <div className="flex items-center justify-between">
          <h1 className={`font-semibold ${scheme.text} group-hover:translate-x-1 transition-transform`}>{event.title}</h1>
          <span className={`text-[10px] font-bold ${scheme.time} px-2 py-1 rounded-full`}>
            {event.startTime.toLocaleTimeString("en-UK", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </span>
        </div>
        <p className="mt-2 text-gray-500 text-sm leading-relaxed">{event.description}</p>
      </div>
    );
  });
};

export default EventList;
