"use client";

import * as React from "react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/status-badge";
import { type Issue } from "@/lib/issues";
import { X, Save } from "lucide-react";

interface IssueDetailPanelProps {
  issue: Issue | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedIssue: Issue) => void;
}

/**
 * IssueDetailPanel component displays a slide-over panel from the right
 * Features:
 * - Editable title (inline text field)
 * - Status dropdown with current status displayed
 * - Full description text editing
 * - Save/Cancel actions
 * - Focus management for accessibility
 * - Width ~400-480px as specified
 */
export function IssueDetailPanel({
  issue,
  isOpen,
  onClose,
  onSave,
}: IssueDetailPanelProps) {
  const [editedTitle, setEditedTitle] = useState("");
  const [editedStatus, setEditedStatus] = useState<Issue["status"]>("open");
  const [editedDescription, setEditedDescription] = useState("");

  // Initialize form when issue changes
  React.useEffect(() => {
    if (issue) {
      setEditedTitle(issue.title);
      setEditedStatus(issue.status);
      setEditedDescription(issue.description);
    }
  }, [issue]);

  const handleSave = () => {
    if (!issue) return;

    const updatedIssue: Issue = {
      ...issue,
      title: editedTitle.trim(),
      status: editedStatus,
      description: editedDescription.trim(),
      updatedAt: new Date().toISOString(),
    };

    onSave(updatedIssue);
    onClose();
  };

  const handleCancel = () => {
    // Reset form to original values
    if (issue) {
      setEditedTitle(issue.title);
      setEditedStatus(issue.status);
      setEditedDescription(issue.description);
    }
    onClose();
  };

  if (!issue) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[480px] px-4 space-y-gap">
        <SheetHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <SheetTitle className="text-xl font-bold text-[#0F172A] dark:text-[#F1F5F9]">
                Issue #{issue.id}
              </SheetTitle>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-gap-lg">
          {/* Title Field */}
          <div className="space-y-2 mb-5">
            <Label htmlFor="title" className="text-sm font-medium">
              Title
            </Label>
            <Input
              id="title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="text-lg font-semibold"
              placeholder="Enter issue title..."
            />
          </div>

          {/* Status Field */}
          <div className="space-y-2 mb-5">
            <Label htmlFor="status" className="text-sm font-medium">
              Status
            </Label>
            <Select
              value={editedStatus}
              onValueChange={(value) =>
                setEditedStatus(value as Issue["status"])
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description Field */}
          <div className="space-y-2 mb-5">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="Enter issue description..."
              className="min-h-[120px] resize-none"
            />
          </div>

          {/* Last Updated */}
          <div className="text-sm text-[#334155] dark:text-[#CBD5E1]">
            <strong>Last updated:</strong>{" "}
            {issue.updatedAt
              ? new Date(issue.updatedAt).toLocaleString()
              : "Unknown"}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex pt-4 justify-end gap-3 border-t border-[#CBD5E1] dark:border-[#334155]">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
