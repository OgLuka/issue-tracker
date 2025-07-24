"use client";

import * as React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type Issue } from "@/lib/issues";
import { Plus, X } from "lucide-react";

interface NewIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newIssue: Omit<Issue, "id">) => void;
}

/**
 * NewIssueModal component displays a centered modal for creating new issues
 * Features:
 * - Title field (required, min 3 chars validation)
 * - Description field (optional)
 * - Status defaults to "open"
 * - Form validation with error messages
 * - Focus management for accessibility
 */
export function NewIssueModal({ isOpen, onClose, onSave }: NewIssueModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setTitle("");
      setDescription("");
      setTitleError("");
    }
  }, [isOpen]);

  const validateTitle = (value: string) => {
    const trimmed = value.trim();
    if (trimmed.length === 0) {
      return "Title is required";
    }
    if (trimmed.length < 3) {
      return "Title must be at least 3 characters";
    }
    return "";
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    // Clear error when user starts typing
    if (titleError) {
      setTitleError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const titleValidationError = validateTitle(title);
    if (titleValidationError) {
      setTitleError(titleValidationError);
      return;
    }

    const newIssue: Omit<Issue, "id"> = {
      title: title.trim(),
      description: description.trim(),
      status: "open", // Default status as specified
      updatedAt: new Date().toISOString(),
    };

    onSave(newIssue);
    onClose();
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setTitleError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] space-y-gap">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-text-primary dark:text-text-primary-dark">
            Create New Issue
          </DialogTitle>
          <DialogDescription className="text-text-secondary dark:text-text-secondary-dark">
            Add a new issue to track. Title is required and must be at least 3
            characters.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-gap-lg">
          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="new-title" className="text-sm font-medium">
              Title <span className="text-accent-danger">*</span>
            </Label>
            <Input
              id="new-title"
              value={title}
              onChange={handleTitleChange}
              className={`text-lg ${titleError ? "border-accent-danger" : ""}`}
              placeholder="Enter issue title..."
              autoFocus
              aria-invalid={!!titleError}
              aria-describedby={titleError ? "title-error" : undefined}
            />
            {titleError && (
              <p
                id="title-error"
                className="text-sm text-accent-danger"
                role="alert"
              >
                {titleError}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="new-description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="new-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter issue description (optional)..."
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Status Info */}
          <div className="text-sm text-text-secondary dark:text-text-secondary-dark bg-surface/50 dark:bg-surface-dark/50 rounded-lg p-3">
            <strong>Status:</strong> New issues will be created with
            &quot;Open&quot; status
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-gap border-t border-border dark:border-border-dark">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-accent-primary hover:bg-accent-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Issue
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
