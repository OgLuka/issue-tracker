"use client";

import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SortToggleProps {
  value: "asc" | "desc";
  onChange: (value: "asc" | "desc") => void;
}

/**
 * SortToggle component allows users to toggle between newest (desc) and oldest (asc) sort
 * Shows appropriate arrow icon based on current sort direction
 */
export function SortToggle({ value, onChange }: SortToggleProps) {
  const handleToggle = () => {
    onChange(value === "asc" ? "desc" : "asc");
  };

  const getSortLabel = () => {
    return value === "desc" ? "Newest" : "Oldest";
  };

  const getSortIcon = () => {
    if (value === "desc") {
      return <ArrowDown className="h-4 w-4" />;
    } else {
      return <ArrowUp className="h-4 w-4" />;
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      className="flex items-center gap-2 bg-white dark:bg-surface-dark-secondary border-border dark:border-border-dark"
    >
      {getSortIcon()}
      <span>{getSortLabel()}</span>
    </Button>
  );
}
