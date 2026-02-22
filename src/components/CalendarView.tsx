import { Task } from "@/types/task";
import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PriorityBadge } from "./PriorityBadge";
import { cn } from "@/lib/utils";

interface CalendarViewProps {
  tasks: Task[];
}

export function CalendarView({ tasks }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getTasksForDay = (day: Date) =>
    tasks.filter((t) => isSameDay(new Date(t.dueDate), day));

  const today = new Date();

  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="rounded-lg p-1.5 hover:bg-accent transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h3 className="text-base font-semibold">{format(currentMonth, "MMMM yyyy")}</h3>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="rounded-lg p-1.5 hover:bg-accent transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-px">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="py-2 text-center text-xs font-medium text-muted-foreground">
            {d}
          </div>
        ))}

        {days.map((day) => {
          const dayTasks = getTasksForDay(day);
          const isToday = isSameDay(day, today);
          const inMonth = isSameMonth(day, currentMonth);

          return (
            <div
              key={day.toISOString()}
              className={cn(
                "min-h-[72px] rounded-lg border border-transparent p-1 text-xs transition-colors",
                !inMonth && "opacity-30",
                isToday && "border-primary/30 bg-primary/5"
              )}
            >
              <span
                className={cn(
                  "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                  isToday && "bg-primary text-primary-foreground"
                )}
              >
                {format(day, "d")}
              </span>
              <div className="mt-0.5 space-y-0.5">
                {dayTasks.slice(0, 2).map((t) => (
                  <div
                    key={t.id}
                    className={cn(
                      "truncate rounded px-1 py-0.5 text-[10px] leading-tight",
                      t.completed
                        ? "bg-muted text-muted-foreground line-through"
                        : t.priority === "high"
                        ? "bg-priority-high-bg text-priority-high"
                        : t.priority === "medium"
                        ? "bg-priority-medium-bg text-priority-medium"
                        : "bg-priority-low-bg text-priority-low"
                    )}
                  >
                    {t.title}
                  </div>
                ))}
                {dayTasks.length > 2 && (
                  <span className="text-[10px] text-muted-foreground pl-1">+{dayTasks.length - 2}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
