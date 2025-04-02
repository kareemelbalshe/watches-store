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
  width = "w-fit",
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${className} ${width} flex items-center justify-center gap-1 px-6 py-4 rounded-lg bg-amber-400 text-md font-medium disabled:cursor-not-allowed`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="text-xl">{icon}</span>{text}
    </button>
  );
});

export default Button;
