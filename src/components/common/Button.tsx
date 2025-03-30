import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
  isLoading?: boolean;
  fullWidth?: boolean;
  disableStyles: boolean;
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  isLoading = false,
  fullWidth = false,
  className = "",
  children,
  disableStyles = false,
  ...props
}) => {
  const baseStyles = "p-2 rounded-md text-center inline-flex justify-center items-center";

  const variantStyles = {
    primary: "bg-primary text-white hover:bg-secondary",
    secondary: "bg-secondary text-white hover:bg-danger",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${disableStyles ? "" : `${baseStyles} ${variantStyles[variant]}`} ${widthStyles} ${className} ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;