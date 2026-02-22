import { Priority } from "@/types/task";
import { Search, Filter } from "lucide-react";

interface TaskFiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  priorityFilter: Priority | "all";
  onPriorityChange: (val: Priority | "all") => void;
  subjectFilter: string;
  onSubjectChange: (val: string) => void;
  subjects: string[];
  statusFilter: "all" | "pending" | "completed";
  onStatusChange: (val: "all" | "pending" | "completed") => void;
}

export function TaskFilters({
  search, onSearchChange,
  priorityFilter, onPriorityChange,
  subjectFilter, onSubjectChange,
  subjects,
  statusFilter, onStatusChange,
}: TaskFiltersProps) {
  const pillClass = (active: boolean) =>
    `rounded-full px-3 py-1 text-xs font-medium border transition-colors cursor-pointer ${
      active ? "bg-primary text-primary-foreground border-primary" : "border-input text-muted-foreground hover:bg-accent"
    }`;

  return (
    <div className="space-y-3 rounded-xl border bg-card p-4 shadow-sm">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Filter className="h-3.5 w-3.5 text-muted-foreground" />

        {/* Status */}
        {(["all", "pending", "completed"] as const).map((s) => (
          <button key={s} onClick={() => onStatusChange(s)} className={pillClass(statusFilter === s)}>
            {s === "all" ? "All" : s === "pending" ? "Pending" : "Done"}
          </button>
        ))}

        <span className="mx-1 h-4 w-px bg-border" />

        {/* Priority */}
        {(["all", "high", "medium", "low"] as const).map((p) => (
          <button key={p} onClick={() => onPriorityChange(p)} className={pillClass(priorityFilter === p)}>
            {p === "all" ? "All Priority" : p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}

        {/* Subject */}
        {subjects.length > 1 && (
          <>
            <span className="mx-1 h-4 w-px bg-border" />
            <select
              value={subjectFilter}
              onChange={(e) => onSubjectChange(e.target.value)}
              className="rounded-full border border-input bg-background px-3 py-1 text-xs text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Subjects</option>
              {subjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </>
        )}
      </div>
    </div>
  );
}
