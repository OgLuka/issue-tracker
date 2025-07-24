import { useState, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface UrlStateParams {
  q?: string;
  status?: string;
  sort?: string;
}

/**
 * Custom hook for managing URL state synchronization
 */
export function useUrlState() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize state from URL parameters
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("q") || ""
  );
  const [statusFilter, setStatusFilter] = useState(
    () => searchParams.get("status") || "all"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(() => {
    const sort = searchParams.get("sort");
    return sort === "asc" || sort === "desc" ? sort : "desc";
  });

  // Update URL when filter state changes
  const updateURL = useCallback(
    (newParams: UrlStateParams) => {
      const params = new URLSearchParams(searchParams);

      // Update or remove parameters
      Object.entries(newParams).forEach(([key, value]) => {
        if (value && value !== "all" && value !== "") {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      // Update URL without page reload
      const newURL = `${pathname}${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      router.replace(newURL, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  // Handle search change with URL update
  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query);
      updateURL({ q: query, status: statusFilter, sort: sortOrder });
    },
    [statusFilter, sortOrder, updateURL]
  );

  // Handle status filter change with URL update
  const handleStatusFilterChange = useCallback(
    (status: string) => {
      setStatusFilter(status);
      updateURL({ q: searchQuery, status: status, sort: sortOrder });
    },
    [searchQuery, sortOrder, updateURL]
  );

  // Handle sort order change with URL update
  const handleSortOrderChange = useCallback(
    (sort: "asc" | "desc") => {
      setSortOrder(sort);
      updateURL({ q: searchQuery, status: statusFilter, sort: sort });
    },
    [searchQuery, statusFilter, updateURL]
  );

  return {
    searchQuery,
    statusFilter,
    sortOrder,
    handleSearchChange,
    handleStatusFilterChange,
    handleSortOrderChange,
  };
}
