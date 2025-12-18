"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarItemProps = {
    item: {
        icon: string;
        label: string;
        href: string;
    };
};

const SidebarItem = ({ item }: SidebarItemProps) => {
    const pathname = usePathname();
    const isActive = pathname === item.href;

    return (
        <Link
            href={item.href}
            className={`flex items-center justify-center lg:justify-start gap-4 py-3 md:px-4 rounded-xl transition-all duration-300 group relative overflow-hidden
                ${isActive
                    ? "bg-gradient-to-r from-lamaSky/20 to-lamaPurple/20 text-lamaSky shadow-md border border-lamaSky/30"
                    : "text-gray-600 hover:bg-white/60 hover:text-gray-800 hover:shadow-sm"
                }`}
        >
            {/* Active indicator */}
            {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-lamaSky to-lamaPurple rounded-r-full"></div>
            )}
            <Image
                src={item.icon}
                alt=""
                width={22}
                height={22}
                className={`transition-all duration-300 ${isActive ? "scale-110" : "opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105"}`}
            />
            <span className={`hidden lg:block font-medium tracking-wide transition-all ${isActive ? "font-semibold gradient-text" : "group-hover:translate-x-1"}`}>
                {item.label}
            </span>
        </Link>
    );
};

export default SidebarItem;
