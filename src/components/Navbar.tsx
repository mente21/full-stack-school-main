import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

const Navbar = async () => {
  const user = await currentUser();
  return (
    <div className="flex items-center justify-between p-4 sticky top-4 z-50 glass mx-4 rounded-2xl shadow-soft transition-all duration-300 hover:shadow-float">
      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center gap-3 text-sm rounded-full ring-1 ring-gray-200 px-4 py-2.5 bg-white/60 focus-within:ring-2 focus-within:ring-lamaSky focus-within:bg-white transition-all duration-300 backdrop-blur-sm group shadow-sm hover:shadow-md">
        <Image src="/search.png" alt="" width={16} height={16} className="opacity-50 group-focus-within:opacity-100 transition-opacity" />
        <input
          type="text"
          placeholder="Search anything..."
          className="w-[220px] bg-transparent outline-none placeholder-gray-400 text-gray-700 font-medium"
        />
      </div>
      {/* ICONS AND USER */}
      <div className="flex items-center gap-5 justify-end w-full">
        {/* Message Icon */}
        <div className="bg-white/70 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-white hover:shadow-md transition-all duration-300 hover:scale-110 relative group border border-white/50">
          <Image src="/message.png" alt="" width={20} height={20} className="opacity-60 group-hover:opacity-100 transition-opacity" />
        </div>
        {/* Notification Icon */}
        <div className="bg-white/70 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer relative hover:bg-white hover:shadow-md transition-all duration-300 hover:scale-110 group border border-white/50">
          <Image src="/announcement.png" alt="" width={20} height={20} className="opacity-60 group-hover:opacity-100 transition-opacity" />
          <div className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-gradient-to-br from-lamaSky to-lamaPurple text-white rounded-full text-[10px] font-bold border-2 border-white shadow-lg animate-pulse">
            1
          </div>
        </div>
        {/* User Info */}
        <div className="flex flex-col items-end">
          <span className="text-sm leading-4 font-semibold text-gray-800">{user?.fullName || "John Doe"}</span>
          <span className="text-[11px] text-gray-500 font-medium uppercase tracking-wider bg-gradient-to-r from-lamaSky/20 to-lamaPurple/20 px-2 py-0.5 rounded-full mt-0.5">
            {user?.publicMetadata?.role as string}
          </span>
        </div>
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "w-11 h-11 border-2 border-white hover:border-lamaSky transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            }
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
