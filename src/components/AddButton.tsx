import React from "react";

type AddButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

export default function AddButton({ onClick, children, disabled }: AddButtonProps) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ml-2 disabled:opacity-50"
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
}