import React, { memo } from "react";

export interface ButtonProps {
  text: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  width?: string;
}

const Button = memo(function Button({
  text,
  icon,
  onClick,
  disabled = false,
  className = "",
  type = "button",
  width = "w-full",
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${className} ${width} h-11 rounded-lg bg-amber-400 text-sm font-medium disabled:bg-gray-100 disabled:cursor-not-allowed`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon} {text}
    </button>
  );
});

export default Button;
