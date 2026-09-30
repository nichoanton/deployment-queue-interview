export const statusFilters = ["All", "Pending", "In Progress", "Completed"] as const;

export type StatusFilter = (typeof statusFilters)[number];