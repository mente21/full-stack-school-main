import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import SidebarItem from "./SidebarItem";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/singleBranch.png",
        label: "Subjects",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/lesson.png",
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "Assignments",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/exam.png",
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/attendance.png",
        label: "Attendance",
        href: "/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = async () => {
  let user;
  try {
    user = await currentUser();
  } catch (err) {
    console.error("Error fetching user in Menu:", err);
  }

  const role = (user?.publicMetadata.role as string) || "guest";
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-1" key={i.title}>
          <span className="hidden lg:flex items-center gap-2 text-gray-400 font-bold my-4 text-[10px] uppercase tracking-widest">
            <span className="h-px w-4 bg-gradient-to-r from-lamaSky to-transparent"></span>
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              if (item.label === "Logout") {
                return (
                  <SignOutButton redirectUrl="/sign-in" key={item.label}>
                    <div className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-3 md:px-4 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all duration-300 cursor-pointer group">
                      <Image src={item.icon} alt="" width={22} height={22} className="opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300" />
                      <span className="hidden lg:block font-medium tracking-wide group-hover:translate-x-1 transition-transform">Logout</span>
                    </div>
                  </SignOutButton>
                );
              }
              return <SidebarItem item={item} key={item.label} />;
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
