import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/status-badge";
import { type Issue } from "@/lib/issues";

interface IssueTableProps {
  issues: Issue[];
  onIssueClick?: (issue: Issue) => void;
}

/**
 * IssueTable component displays issues in a responsive table format
 * Features:
 * - Responsive design that stacks information on mobile
 * - Click handler for issue selection
 * - Proper text wrapping for long titles
 * - Status badges and relative time display
 */
export function IssueTable({ issues, onIssueClick }: IssueTableProps) {
  if (issues.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-surface-dark-secondary rounded-lg border border-border dark:border-border-dark">
        <p className="text-text-secondary dark:text-text-secondary-dark text-lg">
          No issues found.
        </p>
        <p className="text-text-secondary dark:text-text-secondary-dark text-sm mt-2">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
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
              onClick={() => onIssueClick?.(issue)}
            >
              <TableCell className="font-medium">
                <div className="space-y-1">
                  {/* Title - wraps on all screen sizes */}
                  <div className="font-semibold text-text-primary dark:text-text-primary-dark leading-tight break-words">
                    {issue.title}
                  </div>
                  {/* Show description on mobile */}
                  <div className="text-sm text-text-secondary dark:text-text-secondary-dark md:hidden break-words">
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
                <StatusBadge status={issue.status} />
              </TableCell>

              <TableCell className="text-text-secondary dark:text-text-secondary-dark hidden sm:table-cell">
                {issue.updatedAt
                  ? new Date(issue.updatedAt).toLocaleDateString()
                  : "Unknown"}
              </TableCell>

              <TableCell className="hidden md:table-cell">
                <div className="max-w-md text-text-secondary dark:text-text-secondary-dark break-words">
                  {issue.description}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Issue Count */}
      <div className="px-4 py-3 border-t border-border dark:border-border-dark bg-surface/30 dark:bg-surface-dark/30">
        <div className="text-sm text-text-secondary dark:text-text-secondary-dark">
          Showing {issues.length} issue{issues.length !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}
