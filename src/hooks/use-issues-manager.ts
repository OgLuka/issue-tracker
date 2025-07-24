import { useState, useMemo, useCallback } from "react";
import { type Issue } from "@/lib/issues";

/**
 * Custom hook for managing issues data and persistence
 */
export function useIssuesManager(
  initialIssues: Issue[],
  searchQuery: string,
  statusFilter: string,
  sortOrder: "asc" | "desc"
) {
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
  const generateUniqueId = useCallback(() => {
    const existingIds = new Set(issues.map((issue) => issue.id));
    let newId = Math.max(...issues.map((issue) => parseInt(issue.id)), 0) + 1;

    // Ensure uniqueness (handles string IDs too)
    while (existingIds.has(newId.toString())) {
      newId++;
    }

    return newId.toString();
  }, [issues]);

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

  // Update an existing issue
  const updateIssue = useCallback(
    (updatedIssue: Issue) => {
      const newIssues = issues.map((issue) =>
        issue.id === updatedIssue.id ? updatedIssue : issue
      );
      setIssues(newIssues);
      persistIssues(newIssues);
    },
    [issues, persistIssues]
  );

  // Create a new issue
  const createIssue = useCallback(
    (newIssueData: Omit<Issue, "id">) => {
      const newIssue: Issue = {
        ...newIssueData,
        id: generateUniqueId(),
      };

      // Prepend new issue to list (newest first)
      const newIssues = [newIssue, ...issues];
      setIssues(newIssues);
      persistIssues(newIssues);
    },
    [issues, generateUniqueId, persistIssues]
  );

  return {
    issues,
    filteredAndSortedIssues,
    updateIssue,
    createIssue,
  };
}
