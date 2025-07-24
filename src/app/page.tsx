import { IssuesPageClient } from "@/components/issues-page-client";
import { loadIssues } from "@/lib/issues";

// Server component that loads initial data
export default async function IssuesPage() {
  // Load issues server-side at build/request time
  const initialIssues = await loadIssues();

  return <IssuesPageClient initialIssues={initialIssues} />;
}
