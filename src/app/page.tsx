import { loadIssues } from "@/lib/issues";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function IssuesPage() {
  // Load issues server-side at build/request time
  const issues = await loadIssues();

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "open":
        return "default"; // Blue
      case "in_progress":
        return "secondary"; // Amber/Warning
      case "closed":
        return "outline"; // Green
      default:
        return "default";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-status-open/10 text-status-open border-status-open/20";
      case "in_progress":
        return "bg-status-in-progress/10 text-status-in-progress border-status-in-progress/20";
      case "closed":
        return "bg-status-closed/10 text-status-closed border-status-closed/20";
      default:
        return "";
    }
  };

  const formatStatus = (status: string) => {
    return status === "in_progress"
      ? "In Progress"
      : status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-gap">
        {/* Header */}
        <header className="flex items-center justify-between pb-gap mb-gap mb-4">
          <div>
            <h1 className="text-3xl my-3 font-bold text-text-primary dark:text-text-primary-dark">
              Issues
            </h1>
            <p className="text-text-secondary dark:text-text-secondary-dark mt-1">
              Manage and track your project issues
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* TODO: Add search, filter, and sort controls */}
            <Button className="bg-accent-primary hover:bg-accent-primary/90">
              New Issue
            </Button>
          </div>
        </header>

        {/* Issues Table */}
        <main>
          {issues.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-secondary dark:text-text-secondary-dark text-lg">
                No issues found.
              </p>
              <p className="text-text-secondary dark:text-text-secondary-dark text-sm mt-2">
                Get started by creating your first issue.
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-surface-dark-secondary rounded-lg border border-border dark:border-border-dark overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Title</TableHead>
                    <TableHead className="font-semibold w-32">Status</TableHead>
                    <TableHead className="font-semibold w-40 hidden sm:table-cell">
                      Updated
                    </TableHead>
                    <TableHead className="font-semibold hidden md:table-cell">
                      Description
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {issues.map((issue) => (
                    <TableRow
                      key={issue.id}
                      className="cursor-pointer hover:bg-surface/50 dark:hover:bg-surface-dark/50"
                    >
                      <TableCell className="font-medium">
                        <div className="space-y-1">
                          <div className="font-semibold text-text-primary dark:text-text-primary-dark leading-tight">
                            {issue.title}
                          </div>
                          {/* Show description on mobile */}
                          <div className="text-sm text-text-secondary dark:text-text-secondary-dark md:hidden">
                            {issue.description}
                          </div>
                          {/* Show updated time on mobile */}
                          <div className="text-xs text-text-secondary dark:text-text-secondary-dark sm:hidden">
                            {issue.updatedAt
                              ? new Date(issue.updatedAt).toLocaleDateString()
                              : "Unknown"}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getStatusColor(issue.status)}
                        >
                          {formatStatus(issue.status)}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-text-secondary dark:text-text-secondary-dark hidden sm:table-cell">
                        {issue.updatedAt
                          ? new Date(issue.updatedAt).toLocaleDateString()
                          : "Unknown"}
                      </TableCell>

                      <TableCell className="hidden md:table-cell">
                        <div className="max-w-md truncate text-text-secondary dark:text-text-secondary-dark">
                          {issue.description}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Issue Count */}
          {issues.length > 0 && (
            <div className="mt-4 text-sm text-text-secondary dark:text-text-secondary-dark">
              Showing {issues.length} issue{issues.length !== 1 ? "s" : ""}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
