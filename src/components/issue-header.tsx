"use client";

import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/search-input";
import { StatusFilter } from "@/components/status-filter";
import { SortToggle } from "@/components/sort-toggle";
import { DarkModeToggle } from "@/components/dark-mode-toggle";
import { Plus } from "lucide-react";

interface IssueHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: (order: "asc" | "desc") => void;
  onNewIssue: () => void;
}

/**
 * IssueHeader component contains the page title and all control elements
 * Features:
 * - Page title and description
 * - Search input for filtering by title
 * - Status filter dropdown
 * - Sort toggle for newest/oldest
 * - New Issue button
 * - Responsive layout that stacks controls on mobile
 */
export function IssueHeader({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortOrder,
  onSortOrderChange,
  onNewIssue,
}: IssueHeaderProps) {
  return (
    <header className="space-y-4 mb-3 pb-gap mb-gap">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h1 className="text-3xl my-3 font-bold text-[#0F172A] dark:text-[#F1F5F9]">
          Issues
        </h1>

        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search issues..."
        />

        <div className="flex gap-2 flex-wrap">
          <StatusFilter value={statusFilter} onChange={onStatusFilterChange} />

          <SortToggle value={sortOrder} onChange={onSortOrderChange} />
        </div>

        <div className="flex gap-2 items-center">
          <DarkModeToggle />
          <Button
            onClick={onNewIssue}
            className="bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Issue
          </Button>
        </div>
      </div>
    </header>
  );
}
