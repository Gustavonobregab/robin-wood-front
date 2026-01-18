import React, { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

// Usamos forwardRef para garantir que 'refs' passem para o elemento DOM real
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className = '', children, type = "button", ...props }, ref) => {
    
    const baseStyles = "font-sans font-bold border-2 border-ink rounded-lg px-6 py-3 transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-[#00C16C] text-ink shadow-hard hover:bg-[#00E07D]", 
      secondary: "bg-[#FFD60A] text-ink shadow-hard hover:bg-[#FFE033]",
      outline: "bg-white text-ink shadow-hard hover:bg-gray-50"
    };

    return (
      <button 
        ref={ref}
        type={type} // Define padrão como "button" para não dar submit em forms sem querer
        className={`${baseStyles} ${variants[variant]} ${className}`} 
        {...props} // <--- ISSO É O QUE FAZ O ONCLICK FUNCIONAR
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";