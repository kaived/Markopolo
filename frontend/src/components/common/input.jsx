import React, { forwardRef } from "react";

/**
 * Standardized Input Component for Markopolo.
 * Uses the "Single Shadow Engine" for pixel-perfect sapphire focus glow.
 * 
 * @param {Object} props - Standard HTML input props + custom props below
 * @param {React.ReactNode} props.icon - Optional Lucide icon or other element to prepend
 * @param {'dark' | 'light'} props.variant - Theme variant (dark for landing/auth, light for dashboard)
 * @param {string} props.containerClassName - Additional classes for the wrapper div
 */
const Input = forwardRef(({ 
  icon, 
  variant = "dark", 
  containerClassName = "", 
  className = "", 
  ...props 
}, ref) => {
  
  // Theme-specific styles
  const themes = {
    dark: {
      container: "bg-[#0f172a] shadow-[0_0_0_1px_rgba(255,255,255,0.1)] focus-within:shadow-[0_0_0_2px_#007acc,0_0_15px_rgba(0,122,204,0.4)]",
      input: "text-white placeholder:text-slate-500",
      icon: "text-slate-500"
    },
    light: {
      container: "bg-gray-50 shadow-[0_0_0_1px_rgba(0,0,0,0.05)] focus-within:bg-white focus-within:shadow-[0_0_0_2px_#007acc,0_0_15px_rgba(0,122,204,0.1)]",
      input: "text-[#29353d] placeholder:text-gray-400",
      icon: "text-gray-400"
    }
  };

  const theme = themes[variant] || themes.dark;

  return (
    <div className={`
      relative flex items-center w-full h-11 rounded-2xl transition-all duration-200 overflow-hidden
      ${theme.container}
      ${containerClassName}
    `}>
      {icon && (
        <div className={`pl-4 flex items-center justify-center ${theme.icon}`}>
          {icon}
        </div>
      )}
      
      <input
        ref={ref}
        className={`
          w-full h-full bg-transparent border-none outline-none 
          px-4 py-2.5 text-sm font-medium
          [&:-webkit-autofill]:shadow-[0_0_0_1000px_#0f172a_inset] 
          [&:-webkit-autofill]:[text-fill-color:white] 
          [-webkit-text-fill-color:white]
          ${theme.input}
          ${className}
        `}
        {...props}
      />
    </div>
  );
});

Input.displayName = "Input";

export { Input };
