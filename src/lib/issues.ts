export interface Issue {
  id: string;
  title: string;
  status: "open" | "in_progress" | "closed";
  updatedAt: string | null;
  description: string;
}

/**
 * Parse the issues.dat file content and return normalized Issue objects
 * Rules:
 * - Split by '|'
 * - updatedAt may be empty → treat as null
 * - Ignore duplicate IDs beyond the first occurrence
 * - Return objects with { id, title, status, updatedAt, description }
 */
export function parseIssuesData(content: string): Issue[] {
  const lines = content.split("\n");
  const seenIds = new Set<string>();
  const issues: Issue[] = [];

  for (const line of lines) {
    // Skip comments and empty lines
    if (line.startsWith("#") || line.trim() === "") {
      continue;
    }

    const issueParts = line.split("|");
    // Handle both 4 parts (missing updatedAt) and 5 parts (empty updatedAt)
    if (issueParts.length < 4 || issueParts.length > 5) {
      continue; // Skip malformed lines
    }

    let id, title, status, updatedAt, description;

    if (issueParts.length === 4) {
      // updatedAt field is completely missing
      [id, title, status, description] = issueParts;
      updatedAt = null;
    } else {
      // updatedAt field is present (but may be empty)
      [id, title, status, updatedAt, description] = issueParts;
    }

    // Skip duplicate IDs
    if (seenIds.has(id)) {
      continue;
    }
    seenIds.add(id);

    // Validate status
    if (!["open", "in_progress", "closed"].includes(status)) {
      continue;
    }

    issues.push({
      id,
      title,
      status: status as Issue["status"],
      updatedAt: updatedAt ? new Date(updatedAt).toISOString() : null,
      description,
    });
  }

  return issues;
}

/**
 * Load and parse issues from the issues.dat file
 * This function is called server-side at build/request time
 */
export async function loadIssues(): Promise<Issue[]> {
  const fs = await import("fs/promises");
  const path = await import("path");

  try {
    const filePath = path.join(process.cwd(), "issues.dat");
    const content = await fs.readFile(filePath, "utf-8");
    return parseIssuesData(content);
  } catch (error) {
    console.error("Failed to load issues.dat:", error);
    return [];
  }
}
