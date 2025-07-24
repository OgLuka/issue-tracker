import { useState, useCallback } from "react";
import { type Issue } from "@/lib/issues";

/**
 * Custom hook for managing modal state
 */
export function useModalState() {
  // Modal state
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [isNewIssueModalOpen, setIsNewIssueModalOpen] = useState(false);

  // Open detail panel with selected issue
  const openDetailPanel = useCallback((issue: Issue) => {
    setSelectedIssue(issue);
    setIsDetailPanelOpen(true);
  }, []);

  // Close detail panel and clear selected issue
  const closeDetailPanel = useCallback(() => {
    setIsDetailPanelOpen(false);
    setSelectedIssue(null);
  }, []);

  // Open new issue modal
  const openNewIssueModal = useCallback(() => {
    setIsNewIssueModalOpen(true);
  }, []);

  // Close new issue modal
  const closeNewIssueModal = useCallback(() => {
    setIsNewIssueModalOpen(false);
  }, []);

  return {
    selectedIssue,
    isDetailPanelOpen,
    isNewIssueModalOpen,
    openDetailPanel,
    closeDetailPanel,
    openNewIssueModal,
    closeNewIssueModal,
  };
}
