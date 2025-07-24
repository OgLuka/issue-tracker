import { Badge } from "@/components/ui/badge";
import { type Issue } from "@/lib/issues";

interface StatusBadgeProps {
  status: Issue["status"];
}

/**
 * StatusBadge component displays the issue status with appropriate colors
 * Uses semantic color tokens defined in Tailwind config
 */
export function StatusBadge({ status }: StatusBadgeProps) {
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
    <Badge variant="outline" className={getStatusColor(status)}>
      {formatStatus(status)}
    </Badge>
  );
}
