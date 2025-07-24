"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { IssueHeader } from "@/components/issue-header";
import { IssueTable } from "@/components/issue-table";
import { IssueDetailPanel } from "@/components/issue-detail-panel";
import { NewIssueModal } from "@/components/new-issue-modal";
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
 * - Detail slide-over panel for editing issues
 * - New issue modal for creating issues
 * - URL state management for search, filter, and sort
 * - Client-side persistence (localStorage)
 * - Responsive design
 */
export function IssuesPageClient({ initialIssues }: IssuesPageClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [issues, setIssues] = useState(() => {
    // Merge server issues with localStorage changes on initialization
    if (typeof window !== "undefined") {
      try {
        const savedIssues = localStorage.getItem("issue-tracker-issues");
        if (savedIssues) {
          const parsedIssues = JSON.parse(savedIssues);
          // Merge server data with client changes, prioritizing client for existing IDs
          const mergedIssues = [...parsedIssues];

          // Add any new server issues that aren't in localStorage
          initialIssues.forEach((serverIssue) => {
            if (
              !parsedIssues.find((issue: Issue) => issue.id === serverIssue.id)
            ) {
              mergedIssues.push(serverIssue);
            }
          });

          return mergedIssues;
        }
      } catch (error) {
        console.error("Failed to load issues from localStorage:", error);
      }
    }
    return initialIssues;
  });

  // Initialize state from URL parameters
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("q") || ""
  );
  const [statusFilter, setStatusFilter] = useState(
    () => searchParams.get("status") || "all"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(() => {
    const sort = searchParams.get("sort");
    return sort === "asc" || sort === "desc" ? sort : "desc";
  });

  // Modal state
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [isNewIssueModalOpen, setIsNewIssueModalOpen] = useState(false);

  // Update URL when filter state changes
  const updateURL = useCallback(
    (newParams: { q?: string; status?: string; sort?: string }) => {
      const params = new URLSearchParams(searchParams);

      // Update or remove parameters
      Object.entries(newParams).forEach(([key, value]) => {
        if (value && value !== "all" && value !== "") {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      // Update URL without page reload
      const newURL = `${pathname}${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      router.replace(newURL, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  // Handle search change with URL update
  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query);
      updateURL({ q: query, status: statusFilter, sort: sortOrder });
    },
    [statusFilter, sortOrder, updateURL]
  );

  // Handle status filter change with URL update
  const handleStatusFilterChange = useCallback(
    (status: string) => {
      setStatusFilter(status);
      updateURL({ q: searchQuery, status: status, sort: sortOrder });
    },
    [searchQuery, sortOrder, updateURL]
  );

  // Handle sort order change with URL update
  const handleSortOrderChange = useCallback(
    (sort: "asc" | "desc") => {
      setSortOrder(sort);
      updateURL({ q: searchQuery, status: statusFilter, sort: sort });
    },
    [searchQuery, statusFilter, updateURL]
  );

  // Persist issues to localStorage
  const persistIssues = useCallback((newIssues: Issue[]) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("issue-tracker-issues", JSON.stringify(newIssues));
      } catch (error) {
        console.error("Failed to save issues to localStorage:", error);
      }
    }
  }, []);

  // Generate unique ID for new issues
  const generateUniqueId = () => {
    const existingIds = new Set(issues.map((issue) => issue.id));
    let newId = Math.max(...issues.map((issue) => parseInt(issue.id)), 0) + 1;

    // Ensure uniqueness (handles string IDs too)
    while (existingIds.has(newId.toString())) {
      newId++;
    }

    return newId.toString();
  };

  // Filter and sort issues based on current state
  const filteredAndSortedIssues = useMemo(() => {
    let filtered = issues;

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
  }, [issues, searchQuery, statusFilter, sortOrder]);

  const handleIssueClick = (issue: Issue) => {
    setSelectedIssue(issue);
    setIsDetailPanelOpen(true);
  };

  const handleNewIssue = () => {
    setIsNewIssueModalOpen(true);
  };

  const handleSaveIssue = (updatedIssue: Issue) => {
    const newIssues = issues.map((issue) =>
      issue.id === updatedIssue.id ? updatedIssue : issue
    );
    setIssues(newIssues);
    persistIssues(newIssues);
  };

  const handleCreateIssue = (newIssueData: Omit<Issue, "id">) => {
    const newIssue: Issue = {
      ...newIssueData,
      id: generateUniqueId(),
    };

    // Prepend new issue to list (newest first)
    const newIssues = [newIssue, ...issues];
    setIssues(newIssues);
    persistIssues(newIssues);
  };

  const handleCloseDetailPanel = () => {
    setIsDetailPanelOpen(false);
    setSelectedIssue(null);
  };

  const handleCloseNewIssueModal = () => {
    setIsNewIssueModalOpen(false);
  };

  return (
    <>
      <div className="min-h-screen bg-surface dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-gap">
          <IssueHeader
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusFilterChange}
            sortOrder={sortOrder}
            onSortOrderChange={handleSortOrderChange}
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

      {/* Detail Slide-over Panel */}
      <IssueDetailPanel
        issue={selectedIssue}
        isOpen={isDetailPanelOpen}
        onClose={handleCloseDetailPanel}
        onSave={handleSaveIssue}
      />

      {/* New Issue Modal */}
      <NewIssueModal
        isOpen={isNewIssueModalOpen}
        onClose={handleCloseNewIssueModal}
        onSave={handleCreateIssue}
      />
    </>
  );
}
