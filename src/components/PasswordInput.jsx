import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordInput = ({ 
  value, 
  onChange, 
  placeholder = "Masukkan kata sandi", 
  className = "", 
  required = false,
  label = "Kata Sandi",
  showLabel = true 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const defaultClassName = "w-full p-4 pr-12 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-green-50";

  return (
    <div className="mb-6">
      {showLabel && (
        <label className="block text-gray-700 mb-2 font-medium">{label}</label>
      )}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          className={className || defaultClassName}
          placeholder={placeholder}
          required={required}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none"
          tabIndex={-1}
        >
          {showPassword ? (
            <FaEyeSlash className="w-5 h-5" />
          ) : (
            <FaEye className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
