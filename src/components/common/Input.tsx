import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  variant?: "default" | "outlined" | "underlined";
  error?: string;
};

const Input: React.FC<InputProps> = ({
  label,
  variant = "default",
  error,
  className = "",
  ...props
}) => {
  const baseStyles = "w-full px-4 py-2 text-gray-900 focus:outline-none transition-all";

  const variantStyles = {
    default: "bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500",
    outlined: "border border-gray-500 rounded-md focus:ring-2 focus:ring-blue-500",
    underlined: "border-b border-gray-400 focus:border-blue-500",
  };

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

      <input
        className={`${baseStyles} ${variantStyles[variant]} ${error ? "border-red-500" : ""} ${className}`}
        {...props}
      />

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default Input;
