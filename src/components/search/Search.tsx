"use client";
import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { Search, X } from "lucide-react";
import { ProblemMetadata } from "@/types";

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const getMatch = async (query: string) => {
  try {
    const res = await fetch(`/api/getmatchresults?title=${query}`);
    const data = await res.json();
    return data.data;
  } catch (e) {
    console.error("Error:", e);
    return [];
  }
};

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search problems…",
  onSearch,
  searchValue,
  setSearchValue,
}) => {
  const [results, setResults] = useState<ProblemMetadata[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.length < 3) { setResults([]); return; }
    getMatch(value).then((r) => setResults(r ?? []));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setResults([]);
      onSearch?.(searchValue);
    }
  };

  const clear = () => { setSearchValue(""); setResults([]); };

  const pick = (result: ProblemMetadata) => {
    setSearchValue(result.title);
    setResults([]);
    onSearch?.(result.titleSlug);
  };

  return (
    <div className="search-wrap">
      <div className="search-input-row">
        <Search
          className="search-icon"
          size={16}
          aria-hidden="true"
          style={{ cursor: "pointer", pointerEvents: "auto" }}
          onClick={() => { setResults([]); onSearch?.(searchValue); }}
        />
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="search-input"
          aria-label="Search LeetCode problems"
          autoComplete="off"
        />
        {searchValue && (
          <button onClick={clear} className="search-clear-btn" aria-label="Clear search">
            <X size={14} />
          </button>
        )}
      </div>

      {results.length > 0 && (
        <div className="search-dropdown">
          {results.map((r) => (
            <div
              key={r.questionFrontendId}
              className="search-result-item"
              onClick={() => pick(r)}
            >
              <span style={{ color: "var(--muted)", marginRight: "0.5em", fontSize: "0.8em" }}>
                {r.questionFrontendId}.
              </span>
              {r.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
