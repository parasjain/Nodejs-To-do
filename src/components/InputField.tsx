import React from "react";

type InputFieldProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function InputField({ value, onChange, onKeyDown }: InputFieldProps) {
  return (
    <input
      className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="Add a new todo"
      type="text"
    />
  );
}
