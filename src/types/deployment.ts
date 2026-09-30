export type DeploymentEnvironment = "Production" | "QA" | "Development" | "Staging";
export type DeploymentStatus = "Pending" | "In Progress" | "Completed";
export type DeploymentPriority = "Low" | "Medium" | "High" | "Critical";

export interface Deployment {
	id: string;
	application: string;
	version: string;
	environment: DeploymentEnvironment;
	status: DeploymentStatus;
	requestedBy: string;
	requestedAt: string;
	scheduledAt: string;
	region: string;
	priority: DeploymentPriority;
}
