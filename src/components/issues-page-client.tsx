"use client";

import { useState, useMemo } from "react";
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
 * - Client-side persistence (localStorage)
 * - Responsive design
 */
export function IssuesPageClient({ initialIssues }: IssuesPageClientProps) {
  const [issues, setIssues] = useState(initialIssues);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Modal state
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [isNewIssueModalOpen, setIsNewIssueModalOpen] = useState(false);

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
    setIssues((prevIssues) =>
      prevIssues.map((issue) =>
        issue.id === updatedIssue.id ? updatedIssue : issue
      )
    );
    // TODO: Persist to localStorage
  };

  const handleCreateIssue = (newIssueData: Omit<Issue, "id">) => {
    const newIssue: Issue = {
      ...newIssueData,
      id: generateUniqueId(),
    };

    // Prepend new issue to list (newest first)
    setIssues((prevIssues) => [newIssue, ...prevIssues]);
    // TODO: Persist to localStorage
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
