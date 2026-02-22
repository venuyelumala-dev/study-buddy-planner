import { Task } from "@/types/task";
import { PriorityBadge } from "./PriorityBadge";
import { format, isPast, isToday } from "date-fns";
import { Check, Trash2, CalendarDays, BookOpen, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export function TaskCard({ task, onToggle, onDelete, onEdit }: TaskCardProps) {
  const dueDate = new Date(task.dueDate);
  const overdue = !task.completed && isPast(dueDate) && !isToday(dueDate);

  return (
    <div
      className={cn(
        "group flex items-start gap-3 rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md",
        task.completed && "opacity-60"
      )}
    >
      <button
        onClick={() => onToggle(task.id)}
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          task.completed
            ? "border-success bg-success text-success-foreground"
            : "border-muted-foreground/40 hover:border-primary"
        )}
      >
        {task.completed && <Check className="h-3 w-3" />}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={cn(
              "font-medium leading-tight",
              task.completed && "line-through text-muted-foreground"
            )}
          >
            {task.title}
          </span>
          <PriorityBadge priority={task.priority} />
        </div>

        <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {task.subject}
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1",
              overdue && "text-destructive font-medium"
            )}
          >
            <CalendarDays className="h-3 w-3" />
            {isToday(dueDate) ? "Today" : format(dueDate, "MMM d, yyyy")}
            {overdue && " · Overdue"}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 gap-1 opacity-0 transition-all group-hover:opacity-100">
        <button
          onClick={() => onEdit(task)}
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
