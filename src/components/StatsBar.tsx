import { Task } from "@/types/task";
import { CheckCircle2, Clock, AlertTriangle, BarChart3 } from "lucide-react";

interface StatsBarProps {
  tasks: Task[];
}

export function StatsBar({ tasks }: StatsBarProps) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const overdue = tasks.filter(
    (t) => !t.completed && new Date(t.dueDate) < new Date(new Date().toDateString())
  ).length;
  const highPriority = tasks.filter((t) => !t.completed && t.priority === "high").length;

  const stats = [
    { label: "Total", value: total, icon: BarChart3, color: "text-primary" },
    { label: "Completed", value: completed, icon: CheckCircle2, color: "text-success" },
    { label: "Overdue", value: overdue, icon: AlertTriangle, color: "text-destructive" },
    { label: "High Priority", value: highPriority, icon: Clock, color: "text-priority-medium" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="flex items-center gap-3 rounded-xl border bg-card p-3 shadow-sm">
          <s.icon className={`h-5 w-5 shrink-0 ${s.color}`} />
          <div>
            <p className="text-xl font-bold leading-none">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
