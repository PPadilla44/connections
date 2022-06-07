import React from "react";

interface DropdownProps {
  value: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  options: {
    label: string;
    value: string;
  }[];
}

const Dropdown: React.FC<DropdownProps> = ({ value, onChange, options }) => {
  return (
    <div className="flex gap-1">
      <p className="text-base">Sort by</p>
      <select
        className="bg-transparent font-light rounded-md underline"
        onChange={onChange}
        value={value}
      >
        {options.map((option) => (
          <option
            key={option.label}
            className="bg-darkBlue"
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
