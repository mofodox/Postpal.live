'use client';

import React from 'react';

type TextFieldProps = {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
};

const TextField = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  required = true,
  className = '',
}: TextFieldProps) => {
  return (
    <div className={`w-full ${className}`}>
      <label 
        htmlFor={id} 
        className="block text-sm font-medium mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
        aria-label={label}
      />
    </div>
  );
};

export default TextField; 