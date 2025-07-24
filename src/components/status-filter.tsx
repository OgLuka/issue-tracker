"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Issue } from "@/lib/issues";

interface StatusFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export type FilterStatus = Issue["status"] | "all";

/**
 * StatusFilter component provides a dropdown to filter issues by status
 * Options: All, Open, In Progress, Closed
 */
export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-40 bg-white dark:bg-surface-dark-secondary border-border dark:border-border-dark">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="open">Open</SelectItem>
        <SelectItem value="in_progress">In Progress</SelectItem>
        <SelectItem value="closed">Closed</SelectItem>
      </SelectContent>
    </Select>
  );
}
