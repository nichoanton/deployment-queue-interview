/**
 * ============================================================================
 * Exercise 1 - Deployment Card
 * ============================================================================
 *
 * Scenario
 * --------
 *
 * Your team is building an internal Deployment Queue application used by
 * Release Engineers to monitor application deployments.
 *
 * A mock API response has been provided in src/data/MOCK_DATA.ts.
 *
 * In this exercise, your task is to build a reusable DeploymentCard component.
 *
 * ============================================================================
 *
 * ## Requirements

### 1. Component Setup

- Create a `DeploymentCard` component.
- Keep the provided imports unchanged.
- Use React with TypeScript.
- Use the existing Shadcn UI components:
  - Card
  - Badge
  - Button
  - Separator

---
### 2. Deployment Interface

Create the `Deployment` interface with the mockdata properties:
make sure 
environment: "Production" | "QA" | "Development" | "Staging";
status: "Pending" | "In Progress" | "Completed";
priority: "Low" | "Medium" | "High" | "Critical";



 * ============================================================================
 *
 * UI Requirements
 *
 * • Use the provided shadcn/ui components where appropriate.
 *
 * • Environment and Status should be displayed using badges.
 *
 * • Color the left border of the card based on priority.
 *   Priority values in the data are: Low, Medium, High, and Critical.
 *   Choose a distinct color for each priority.
 *
 * • Display a "advance to [next status]" button at the bottom of the card.
 *
 * • Use appropriate spacing and visual hierarchy.
 *
 * • The component should remain responsive.
 *
 * ============================================================================
 *
 * Technical Expectations
 *
 * • Use TypeScript.
 *
 * • Define appropriate interfaces/types.
 *
 * • Keep the component reusable.
 *
 * • Do not hardcode values.
 *
 * • Avoid unnecessary duplication.
 *
 * • Write clean, maintainable code.
 *
 * ============================================================================
 *
 * Evaluation
 *
 * We will evaluate:
 *
 * ✓ React Fundamentals
 * ✓ Component Composition
 * ✓ TypeScript
 * ✓ Code Organization
 * ✓ Reusability
 * ✓ Tailwind CSS
 *
 * ============================================================================
 *
 * Note
 *
 * This exercise focuses only on the DeploymentCard component.
 *
 * Additional requirements will be introduced in later exercises.
 *
 * ============================================================================
 */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Deployment, DeploymentStatus } from "@/types/deployment";

interface Props {
  deployment: Deployment;
  onStatusChange?: (status: DeploymentStatus) => void;
}

const DeploymentCard = ({ deployment, onStatusChange }: Props) => {
  const [status, setStatus] = useState(deployment.status);

  const getPriorityColor = () => {
    if (deployment.priority === "Critical") {
      return "border-l-red-500";
    }
    if (deployment.priority === "High") {
      return "border-l-orange-500";
    }
    if (deployment.priority === "Medium") {
      return "border-l-yellow-500";
    }
    if (deployment.priority === "Low") {
      return "border-l-green-500";
    }
  };

  const getStatusColor = () => {
    if (status === "Pending") {
      return "bg-amber-100 text-amber-700 border-amber-200";
    }
    if (status === "In Progress") {
      return "bg-blue-100 text-blue-700 border-blue-200";
    }
    return "bg-green-100 text-green-700 border-green-200";
  };

  const getNextStatus = () => {
    if (status === "Pending") {
      return "In Progress";
    }
    if (status === "In Progress") {
      return "Completed";
    }
    return null;
  };

  const nextStatus = getNextStatus();

  return (
    <Card className={`border-l-4 ${getPriorityColor()}`}>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>{deployment.application}</CardTitle>
            <CardDescription>
              <span>{deployment.version}</span>
              <span className="mt-1 block">
                Deployment ID: <b>{deployment.id}</b>
              </span>
            </CardDescription>
          </div>

          <Badge className="bg-gray-500 text-white">
            {deployment.environment}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between gap-2">
          <Badge className={getStatusColor()}>{status}</Badge>
          <p className="text-sm text-muted-foreground">
            Priority <span className="font-semibold text-foreground">{deployment.priority}</span>
          </p>
        </div>

        <Separator className="my-4" />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Requested By</p>
            <p>{deployment.requestedBy}</p>
          </div>

          <div>
            <p className="text-gray-500">Region</p>
            <p>{deployment.region}</p>
          </div>

          <div>
            <p className="text-gray-500">Requested At</p>
            <p>{new Date(deployment.requestedAt).toLocaleDateString()}</p>
          </div>

          <div>
            <p className="text-gray-500">Scheduled At</p>
            <p>{new Date(deployment.scheduledAt).toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        {nextStatus ? (
          <Button
            className="w-full"
            onClick={() => {
              setStatus(nextStatus);
              onStatusChange?.(nextStatus);
            }}
          >
            Advance to {nextStatus}
          </Button>
        ) : (
          <Button className="w-full bg-gray-500 text-white hover:bg-gray-500" disabled>
            ✅ Completed
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default DeploymentCard;
