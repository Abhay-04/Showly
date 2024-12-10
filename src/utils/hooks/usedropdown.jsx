import React, { useState } from "react";

const Dropdown = ({ title, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option); // Dispatch action or trigger callback
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-purple-600 min-w-32 text-white rounded-md shadow-md focus:outline-none"
      >
        <div className="flex justify-between items-center gap-3">
          <div>{selectedOption.toUpperCase() || title.toUpperCase()} </div>
          <div>
            {isOpen ? (
              <i className="ri-arrow-up-s-line"></i>
            ) : (
              <i className="ri-arrow-down-s-line"></i>
            )}
          </div>
        </div>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute mt-2 bg-white border rounded-md shadow-lg w-48 z-50">
          <ul className="py-2">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(option)}
                className="px-4 py-2  hover:bg-blue-100 cursor-pointer"
              >
                {option.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
