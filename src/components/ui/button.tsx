import React from 'react';
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
      secondary: "bg-slate-200 text-slate-900 hover:bg-slate-300",
      outline: "border border-slate-200 bg-white/50 backdrop-blur-sm hover:bg-white/80 text-slate-700",
      ghost: "bg-transparent hover:bg-slate-100 text-slate-600"
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none active:scale-95",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
