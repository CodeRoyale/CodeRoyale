import React from "react";

type SelectValue = any;

interface SelectProps {
  label: string;
  value: SelectValue;
  onChange: (value: SelectValue) => void;
  options: { option: string; value: any }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options = [],
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-primary-300 mb-2 font-semibold">{label}</label>
      <select
        className="w-full bg-primary-700 rounded-md text-primary-100 border-none focus:border-none focus:ring-0 focus:outline focus:outline-offset-2 focus:outline-focus-outline"
        value={value}
        onChange={onChange}
      >
        {options.map((option, id) => (
          <option key={id} value={option.value} className="text-primary-100">
            {option.option}
          </option>
        ))}
      </select>
    </div>
  );
};
