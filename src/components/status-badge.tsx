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
        return "bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20"; // Blue for open
      case "in_progress":
        return "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20"; // Amber for in progress
      case "closed":
        return "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20"; // Green for closed
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
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
