"use client";

import { useState, useMemo } from "react";
import { IssueHeader } from "@/components/issue-header";
import { IssueTable } from "@/components/issue-table";
import { type Issue } from "@/lib/issues";

interface IssuesPageClientProps {
  initialIssues: Issue[];
}

/**
 * Client component that manages the issues list state and filtering
 * Features:
 * - Search by title (case-insensitive substring matching)
 * - Filter by status (All, Open, In Progress, Closed)
 * - Sort by updatedAt (Newest/Oldest, null values always last)
 * - Responsive design
 */
export function IssuesPageClient({ initialIssues }: IssuesPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Filter and sort issues based on current state
  const filteredAndSortedIssues = useMemo(() => {
    let filtered = initialIssues;

    // Apply search filter (case-insensitive title substring)
    if (searchQuery.trim()) {
      filtered = filtered.filter((issue) =>
        issue.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((issue) => issue.status === statusFilter);
    }

    // Apply sort by updatedAt (null values always last)
    const sorted = [...filtered].sort((a, b) => {
      // Handle null values - always put them last
      if (!a.updatedAt && !b.updatedAt) return 0;
      if (!a.updatedAt) return 1;
      if (!b.updatedAt) return -1;

      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();

      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    return sorted;
  }, [initialIssues, searchQuery, statusFilter, sortOrder]);

  const handleIssueClick = (issue: Issue) => {
    console.log("Issue clicked:", issue);
    // TODO: Open detail slide-over panel
  };

  const handleNewIssue = () => {
    console.log("New issue clicked");
    // TODO: Open new issue modal
  };

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-gap">
        <IssueHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          onNewIssue={handleNewIssue}
        />

        <main>
          <IssueTable
            issues={filteredAndSortedIssues}
            onIssueClick={handleIssueClick}
          />
        </main>
      </div>
    </div>
  );
}
