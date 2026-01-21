import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "flex w-full items-center justify-center rounded-lg h-12 px-5 font-bold transition-all duration-200";
  
  const variants = {
    primary: "bg-[#28a4bd] text-white hover:bg-opacity-90 shadow-sm hover:shadow-md",
    outline: "border border-[#dce3e4] dark:border-[#4a5056] bg-white dark:bg-transparent text-[#121617] dark:text-white hover:bg-gray-50 dark:hover:bg-white/5",
    ghost: "text-[#667f85] dark:text-gray-400 hover:text-primary"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;