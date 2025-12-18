"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const TableSearch = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = (e.currentTarget[0] as HTMLInputElement).value;

    const params = new URLSearchParams(window.location.search);
    params.set("search", value);
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-auto flex items-center gap-3 text-sm rounded-full ring-1 ring-gray-200 px-4 py-2.5 bg-white/70 focus-within:ring-2 focus-within:ring-lamaSky focus-within:bg-white transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md group"
    >
      <Image src="/search.png" alt="" width={16} height={16} className="opacity-50 group-focus-within:opacity-100 transition-opacity" />
      <input
        type="text"
        placeholder="Search..."
        className="w-[200px] bg-transparent outline-none placeholder-gray-400 text-gray-700 font-medium"
      />
    </form>
  );
};

export default TableSearch;
