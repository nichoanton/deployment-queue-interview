import { useMemo, useState } from "react";
import type { Deployment } from "@/types/deployment";

export function useDeploymentFilters<T extends Pick<Deployment, "application">>(
  deployments: T[]
) {
  const [search, setSearch] = useState("");

  const filteredDeployments = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return deployments;

    return deployments.filter((deployment) =>
      deployment.application.toLowerCase().includes(query)
    );
  }, [search, deployments]);

  return {
    search,
    setSearch,
    filteredDeployments,
  };
}

const SearchPlaceholder = () => {
  return null;
};

export default SearchPlaceholder;