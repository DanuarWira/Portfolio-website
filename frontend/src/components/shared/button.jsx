import React from "react";
import { cva } from "class-variance-authority";

const buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors cursor-pointer", {
  variants: {
    variant: {
      primary: "bg-primary-700 text-gray-50 hover:bg-primary-800",
      primaryDisabled: "bg-gray-200 text-gray-500",
      secondary: "bg-primary-100 text-primary-700 hover:text-primary-800 hover:bg-primary-200",
      plain: "bg-transparent text-primary-700 hover:text-primary-800",
      plainDisabled: "bg-transparent text-gray-400",
    },
    size: {
      default: "px-3 py-2.5",
      sm: "px-4 py-2",
      lg: "px-3.5 py-3",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

const Button = React.forwardRef(({ disabled, onClick, className, variant, size, children, icon: Icon, iconPosition = "left", ...props }, ref) => {
  return (
    <button disabled={disabled} onClick={onClick} className={buttonVariants({ variant, size, className })} ref={ref} {...props}>
      {Icon && iconPosition === "left" && <Icon size={16} />}
      {children}
      {Icon && iconPosition === "right" && <Icon size={16} />}
    </button>
  );
});

export { Button, buttonVariants };
