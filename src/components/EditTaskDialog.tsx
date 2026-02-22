import { useState } from "react";
import { Task, Priority } from "@/types/task";
import { Pencil, X } from "lucide-react";

interface EditTaskDialogProps {
  task: Task;
  onSave: (id: string, updates: Partial<Omit<Task, "id" | "createdAt">>) => void;
  onClose: () => void;
}

export function EditTaskDialog({ task, onSave, onClose }: EditTaskDialogProps) {
  const [title, setTitle] = useState(task.title);
  const [subject, setSubject] = useState(task.subject);
  const [priority, setPriority] = useState<Priority>(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !subject.trim() || !dueDate) return;
    onSave(task.id, { title: title.trim(), subject: subject.trim(), priority, dueDate });
    onClose();
  };

  const inputClass =
    "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 transition-shadow";
  const labelClass = "block text-sm font-medium mb-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Pencil className="h-4 w-4 text-primary" /> Edit Task
          </h2>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-accent transition-colors">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Task Title</label>
            <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className={labelClass}>Subject</label>
            <input className={inputClass} value={subject} onChange={(e) => setSubject(e.target.value)} required />
          </div>
          <div>
            <label className={labelClass}>Due Date</label>
            <input type="date" className={inputClass} value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
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

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-input px-4 py-2 text-sm font-medium hover:bg-accent transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
