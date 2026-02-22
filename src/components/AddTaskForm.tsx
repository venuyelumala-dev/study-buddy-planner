import { useState } from "react";
import { Priority } from "@/types/task";
import { Plus } from "lucide-react";

interface AddTaskFormProps {
  onAdd: (task: { title: string; subject: string; priority: Priority; dueDate: string }) => void;
}

export function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !subject.trim() || !dueDate) return;
    onAdd({ title: title.trim(), subject: subject.trim(), priority, dueDate });
    setTitle("");
    setSubject("");
    setPriority("medium");
    setDueDate("");
  };

  const inputClass =
    "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 transition-shadow";
  const labelClass = "block text-sm font-medium mb-1";

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border bg-card p-5 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Add New Task</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass}>Task Title</label>
          <input
            className={inputClass}
            placeholder="e.g. Complete Math Assignment"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Subject</label>
          <input
            className={inputClass}
            placeholder="e.g. Mathematics"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Due Date</label>
          <input
            type="date"
            className={inputClass}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Priority</label>
          <div className="flex gap-2">
            {(["low", "medium", "high"] as Priority[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium capitalize transition-colors ${
                  priority === p
                    ? p === "high"
                      ? "border-priority-high bg-priority-high-bg text-priority-high"
                      : p === "medium"
                      ? "border-priority-medium bg-priority-medium-bg text-priority-medium"
                      : "border-priority-low bg-priority-low-bg text-priority-low"
                    : "border-input text-muted-foreground hover:bg-accent"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <Plus className="h-4 w-4" />
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
}
