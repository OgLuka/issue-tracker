"use client";

import { IssueHeader } from "@/components/issue-header";
import { IssueTable } from "@/components/issue-table";
import { IssueDetailPanel } from "@/components/issue-detail-panel";
import { NewIssueModal } from "@/components/new-issue-modal";
import { useUrlState, useIssuesManager, useModalState } from "@/hooks";
import { type Issue } from "@/lib/issues";

interface IssuesPageClientProps {
  initialIssues: Issue[];
}

/**
 * Client component that manages the issues list state and filtering
 */
export function IssuesPageClient({ initialIssues }: IssuesPageClientProps) {
  // URL state management
  const {
    searchQuery,
    statusFilter,
    sortOrder,
    handleSearchChange,
    handleStatusFilterChange,
    handleSortOrderChange,
  } = useUrlState();

  // Issues data management
  const { filteredAndSortedIssues, updateIssue, createIssue } =
    useIssuesManager(initialIssues, searchQuery, statusFilter, sortOrder);

  // Modal state management
  const {
    selectedIssue,
    isDetailPanelOpen,
    isNewIssueModalOpen,
    openDetailPanel,
    closeDetailPanel,
    openNewIssueModal,
    closeNewIssueModal,
  } = useModalState();

  return (
    <>
      <div className="min-h-screen bg-[#F1F5F9] dark:bg-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-gap">
          <IssueHeader
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusFilterChange}
            sortOrder={sortOrder}
            onSortOrderChange={handleSortOrderChange}
            onNewIssue={openNewIssueModal}
          />

          <main>
            <IssueTable
              issues={filteredAndSortedIssues}
              onIssueClick={openDetailPanel}
            />
          </main>
        </div>
      </div>

      {/* Detail Slide-over Panel */}
      <IssueDetailPanel
        issue={selectedIssue}
        isOpen={isDetailPanelOpen}
        onClose={closeDetailPanel}
        onSave={updateIssue}
      />

      {/* New Issue Modal */}
      <NewIssueModal
        isOpen={isNewIssueModalOpen}
        onClose={closeNewIssueModal}
        onSave={createIssue}
      />
    </>
  );
}
