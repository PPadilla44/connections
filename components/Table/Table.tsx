import React from "react";

interface TableProps {
  headers: string[];
  bodyData: Object[];
}

const Table: React.FC<TableProps> = ({ headers, bodyData }) => {
  return (
    <div className="bg-black w-full border border-gray rounded-sm">
      <ul className="flex justify-between px-2">
        {headers.map((head) => (
          <p className="max-w-xs w-full" key={head}>
            {head}
          </p>
        ))}
      </ul>
      <ul className="flex justify-between flex-col px-2">
        {bodyData.map((item, i) => (
          <li
            key={`leader-${i}`}
            className="border-t border-gray flex justify-between py-1"
          >
            {Object.keys(item).map((key, i) => (
              <p key={`${key}-${i}`} className="max-w-xs w-full truncate">
                {(item as any)[key]}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Table;
