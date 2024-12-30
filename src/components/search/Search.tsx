"use client";
import React, { useState, ChangeEvent } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  onSearch,
  className = "",
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  const clearSearch = () => {
    setSearchValue("");
    onSearch?.("");
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative flex items-center">
        <Search 
          className="absolute left-3 h-4 w-4 text-gray-400" 
          aria-hidden="true"
        />
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="h-10 w-full rounded-md border border-gray-200 bg-white pl-10 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
        />
        {searchValue && (
          <button
            onClick={clearSearch}
            className="absolute right-2 p-1 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;