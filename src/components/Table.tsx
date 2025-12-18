const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <table className="w-full mt-4 border-separate border-spacing-y-2">
      <thead>
        <tr className="text-left text-gray-500 text-sm">
          {columns.map((col) => (
            <th
              key={col.accessor}
              className={`${col.className} pb-4 font-semibold text-gray-500 uppercase text-xs tracking-wider`}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="space-y-2">{data.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;
