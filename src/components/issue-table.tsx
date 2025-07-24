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

export function IssueTable({ issues, onIssueClick }: IssueTableProps) {
  if (issues.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-[#334155] rounded-lg border border-[#CBD5E1] dark:border-[#334155]">
        <p className="text-[#334155] dark:text-[#CBD5E1] text-lg">
          No issues found.
        </p>
        <p className="text-[#334155] dark:text-[#CBD5E1] text-sm mt-2">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#334155] rounded-lg border border-[#CBD5E1] dark:border-[#334155] overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold w-[50%] min-w-[250px]">
                Title
              </TableHead>
              <TableHead className="font-semibold w-[120px]">Status</TableHead>
              <TableHead className="font-semibold w-[140px] hidden sm:table-cell">
                Updated
              </TableHead>
              <TableHead className="font-semibold w-[30%] hidden md:table-cell">
                Description
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {issues.map((issue) => (
              <TableRow
                key={issue.id}
                className="cursor-pointer hover:bg-[#F1F5F9]/50 dark:hover:bg-[#1E293B]/50"
                onClick={() => onIssueClick?.(issue)}
              >
                <TableCell className="font-medium w-[50%] min-w-[250px] pr-4">
                  <div className="space-y-1">
                    {/* Title - wraps on all screen sizes */}
                    <div className="font-semibold text-[#0F172A] dark:text-[#F1F5F9] leading-tight break-words hyphens-auto">
                      <span className="text-sm max-w-[80%] line-clamp-5 text-wrap">
                        {issue.title}
                      </span>
                    </div>
                    {/* Show description on mobile */}
                    <div className="text-sm text-[#334155] dark:text-[#CBD5E1] md:hidden break-words">
                      {issue.description}
                    </div>
                    {/* Show updated time on mobile */}
                    <div className="text-xs text-[#334155] dark:text-[#CBD5E1] sm:hidden">
                      {issue.updatedAt
                        ? new Date(issue.updatedAt).toLocaleDateString()
                        : "Unknown"}
                    </div>
                  </div>
                </TableCell>

                <TableCell className="w-[120px] px-2">
                  <StatusBadge status={issue.status} />
                </TableCell>

                <TableCell className="w-[140px] text-[#334155] dark:text-[#CBD5E1] hidden sm:table-cell px-2">
                  {issue.updatedAt
                    ? new Date(issue.updatedAt).toLocaleDateString()
                    : "Unknown"}
                </TableCell>

                <TableCell className="w-[30%] hidden md:table-cell px-2">
                  <div className="text-[#334155] dark:text-[#CBD5E1]">
                    <span className="line-clamp-5 text-wrap max-w-[90%]">
                      {issue.description}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Issue Count */}
      <div className="px-4 py-3 border-t border-[#CBD5E1] dark:border-[#334155] bg-[#F1F5F9]/30 dark:bg-[#1E293B]/30">
        <div className="text-sm text-[#334155] dark:text-[#CBD5E1]">
          Showing {issues.length} issue{issues.length !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}
