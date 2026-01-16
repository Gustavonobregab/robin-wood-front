import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...props }) => {
  const baseStyles = "font-sans font-bold border-2 border-ink rounded-lg px-6 py-3 transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";
  
  const variants = {
    primary: "bg-[#00C16C] text-ink shadow-hard hover:bg-[#00E07D]", 
    
    secondary: "bg-[#FFD60A] text-ink shadow-hard hover:bg-[#FFE033]",
    
    outline: "bg-white text-ink shadow-hard hover:bg-gray-50"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};