import React, { useState } from 'react';

const InputField = ({ label, type = 'text', placeholder, rightElement, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center">
        <label className="text-[#121617] dark:text-gray-200 text-sm font-semibold">{label}</label>
        {rightElement}
      </div>
      <div className="relative flex">
        <input
          type={isPassword && !showPassword ? 'password' : 'text'}
          placeholder={placeholder}
          className={`flex w-full rounded-lg text-[#121617] dark:text-white dark:bg-[#32383e] focus:ring-1 focus:ring-[#28a4bd] focus:outline-none border border-[#dce3e4] dark:border-[#4a5056] h-12 p-[15px] text-sm ${isPassword ? 'rounded-r-none border-r-0' : ''}`}
          {...props}
        />
        {isPassword && (
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="flex border border-[#dce3e4] dark:border-[#4a5056] dark:bg-[#32383e] items-center justify-center px-3 rounded-r-lg border-l-0 text-[#667f85] hover:text-[#28a4bd]"
          >
            <span className="material-symbols-outlined text-[20px]">
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;