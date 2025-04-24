import React, { useState, useEffect } from "react";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  debounceTime?: number;
  autoFocus?: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  placeholder = "Search...",
  className = "",
  debounceTime = 300,
  autoFocus = false,
}) => {
  const [searchTimeout, setSearchTimeout] = useState<number>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const newTimeout = window.setTimeout(() => {
      onSearch(e.target.value);
    }, debounceTime);

    setSearchTimeout(newTimeout);
  };

  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`search-box ${className}`}
      onChange={handleChange}
      autoFocus={autoFocus}
      aria-label={placeholder} 
      role="searchbox"
    />
  );
};

export default SearchBox;
