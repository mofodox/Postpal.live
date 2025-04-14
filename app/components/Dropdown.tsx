'use client';

import React from 'react';

type Option = {
  value: string;
  label: string;
};

type DropdownProps = {
  id: string;
  label: string;
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  className?: string;
};

const Dropdown = ({
  id,
  label,
  options,
  value,
  onChange,
  required = false,
  className = '',
}: DropdownProps) => {
  return (
    <div className={`w-full ${className}`}>
      <label 
        htmlFor={id} 
        className="block text-sm font-medium mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all appearance-none"
        aria-label={label}
      >
        <option value="" disabled>Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown; 