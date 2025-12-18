import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";

import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Class, Prisma, Student } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { auth } from "@clerk/nextjs/server";

type StudentList = Student & { class: Class };

const StudentListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const columns = [
    {
      header: "Info",
      accessor: "info",
    },
    {
      header: "Student ID",
      accessor: "studentId",
      className: "hidden md:table-cell",
    },
    {
      header: "Grade",
      accessor: "grade",
      className: "hidden md:table-cell",
    },
    {
      header: "Phone",
      accessor: "phone",
      className: "hidden lg:table-cell",
    },
    {
      header: "Address",
      accessor: "address",
      className: "hidden lg:table-cell",
    },
    ...(role === "admin"
      ? [
        {
          header: "Actions",
          accessor: "action",
        },
      ]
      : []),
  ];

  const renderRow = (item: StudentList) => (
    <tr
      key={item.id}
      className="bg-white/60 hover:bg-white hover:shadow-md transition-all duration-300 ease-in-out rounded-xl group"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="relative">
          <Image
            src={item.img || "/noAvatar.png"}
            alt=""
            width={48}
            height={48}
            className="md:hidden xl:block w-12 h-12 rounded-xl object-cover shadow-sm group-hover:shadow-md transition-shadow"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-800 group-hover:text-lamaSky transition-colors">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.class.name}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">
        <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
          {item.username}
        </span>
      </td>
      <td className="hidden md:table-cell">
        <span className="px-3 py-1.5 bg-lamaPurpleLight text-lamaPurple rounded-lg text-xs font-bold">
          {item.class.name[0]}
        </span>
      </td>
      <td className="hidden md:table-cell">
        <span className="text-gray-600 text-sm">{item.phone}</span>
      </td>
      <td className="hidden md:table-cell">
        <span className="text-gray-500 text-sm">{item.address}</span>
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${item.id}`}>
            <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-gradient-to-br from-lamaSky to-cyan-400 hover:shadow-lg hover:scale-110 transition-all">
              <Image src="/view.png" alt="" width={16} height={16} className="brightness-0 invert" />
            </button>
          </Link>
          {role === "admin" && (
            <FormContainer table="student" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.StudentWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId":
            query.class = {
              lessons: {
                some: {
                  teacherId: value,
                },
              },
            };
            break;
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.student.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.student.count({ where: query }),
  ]);

  return (
    <div className="glass-card p-6 rounded-2xl flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-lamaPurple to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-xl">👨‍🎓</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">All Students</h1>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-3 self-end">
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/80 hover:bg-white hover:shadow-md transition-all border border-gray-200">
              <Image src="/filter.png" alt="" width={16} height={16} className="opacity-60" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/80 hover:bg-white hover:shadow-md transition-all border border-gray-200">
              <Image src="/sort.png" alt="" width={16} height={16} className="opacity-60" />
            </button>
            {role === "admin" && (
              <FormContainer table="student" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default StudentListPage;
