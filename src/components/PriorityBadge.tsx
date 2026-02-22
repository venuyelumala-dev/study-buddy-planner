import { Priority } from "@/types/task";
import { cn } from "@/lib/utils";

const config: Record<Priority, { label: string; className: string }> = {
  high: { label: "High", className: "bg-priority-high-bg text-priority-high" },
  medium: { label: "Medium", className: "bg-priority-medium-bg text-priority-medium" },
  low: { label: "Low", className: "bg-priority-low-bg text-priority-low" },
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  const { label, className } = config[priority];
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", className)}>
      {label}
    </span>
  );
}
