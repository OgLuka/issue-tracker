"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * SearchInput component for filtering issues by title substring
 * Features a search icon and handles real-time search input
 */
export function SearchInput({
  value,
  onChange,
  placeholder = "Search issues...",
}: SearchInputProps) {
  return (
    <div className="relative flex-1 max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#334155] dark:text-[#CBD5E1]" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 bg-white dark:bg-[#334155] border-[#CBD5E1] dark:border-[#334155] text-[#0F172A] dark:text-[#F1F5F9]"
      />
    </div>
  );
}
