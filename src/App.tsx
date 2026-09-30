import DeploymentCard from "./exercise/example1";
import { data } from "./data/MOCK_DATA";
import { useDeploymentFilters } from "./hooks/useDeploymentFilters";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { statusFilters, type StatusFilter } from "./types/status";
import type { Deployment, DeploymentStatus } from "./types/deployment";

const App = () => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [updatedStatuses, setUpdatedStatuses] = useState<Record<string, DeploymentStatus>>({});
   const {
    data: deployments = [],
    isLoading,
    isError,
  } = useQuery<Deployment[]>({
    queryKey: ["deployments"],
    queryFn: async () => data,
  });

  const deploymentsWithUpdatedStatuses = useMemo<Deployment[]>(
    () =>
      deployments.map((deployment) => ({
        ...deployment,
        status: updatedStatuses[deployment.id] ?? deployment.status,
      })),
    [deployments, updatedStatuses]
  );

  const {
    search,
    setSearch,
    filteredDeployments,
  } = useDeploymentFilters(deploymentsWithUpdatedStatuses);

  const visibleDeployments = useMemo(() => {
    if (statusFilter === "All") return filteredDeployments;
    return filteredDeployments.filter(
      (deployment) => deployment.status === statusFilter
    );
  }, [filteredDeployments, statusFilter]);

   if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <p>Loading deployments...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-6">
        <p>Failed to load deployments.</p>
      </div>
    );
  }

   return (
    <div className="container mx-auto max-w-7xl space-y-6 p-6">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-slate-900 px-6 py-5 text-white shadow-sm">
        <h1 className="text-2xl font-bold">Deployment Queue</h1>
        <section
          aria-label="Total deployments"
          className="min-w-52 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-center"
        >
          <p className="text-sm font-medium uppercase tracking-wide text-sky-200">
            Total Deployments
          </p>
          <p className="mt-1 text-4xl font-bold leading-none" aria-live="polite">
            {deployments.length}
          </p>
        </section>
      </header>

      <section
        aria-labelledby="search-filters-heading"
        className="space-y-4 rounded-xl border bg-card p-5 shadow-sm"
      >
        <h2 id="search-filters-heading" className="text-lg font-semibold">
          Search &amp; Filters
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search application by name..."
            className="w-full rounded-md border bg-background px-3 py-2 md:max-w-md"
          />
          <div className="flex flex-wrap gap-3" aria-label="Filter deployments by status">
            {statusFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                aria-pressed={statusFilter === filter}
                onClick={() => setStatusFilter(filter)}
                className={`rounded-xl border px-4 py-2 font-medium transition-colors ${
                  statusFilter === filter
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-100"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {visibleDeployments.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visibleDeployments.map((deployment) => (
            <DeploymentCard
              key={deployment.id}
              deployment={deployment}
              onStatusChange={(status) =>
                setUpdatedStatuses((current) => ({
                  ...current,
                  [deployment.id]: status,
                }))
              }
            />
          ))}
        </div>
      ) : (
        <div className="py-10 text-center" role="status">
          <h2 className="text-2xl font-semibold">
            No Deployments Found
          </h2>

          <p className="mt-3 text-base text-muted-foreground">
            Try changing your search keyword.
          </p>
        </div>
      )}
    </div>
  );
};

export default App;