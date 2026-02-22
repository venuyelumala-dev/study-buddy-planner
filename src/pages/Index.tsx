import { useState, useMemo } from "react";
import { useTasks } from "@/hooks/useTasks";
import { AddTaskForm } from "@/components/AddTaskForm";
import { TaskCard } from "@/components/TaskCard";
import { EditTaskDialog } from "@/components/EditTaskDialog";
import { StatsBar } from "@/components/StatsBar";
import { TaskFilters } from "@/components/TaskFilters";
import { CalendarView } from "@/components/CalendarView";
import { Task, Priority } from "@/types/task";
import { ClipboardList, GraduationCap, List, CalendarDays } from "lucide-react";

const Index = () => {
  const { tasks, rawTasks, addTask, toggleTask, deleteTask, editTask } = useTasks();

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "completed">("all");
  const [view, setView] = useState<"list" | "calendar">("list");

  const subjects = useMemo(
    () => [...new Set(rawTasks.map((t) => t.subject))].sort(),
    [rawTasks]
  );

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (search && !t.title.toLowerCase().includes(search.toLowerCase()) && !t.subject.toLowerCase().includes(search.toLowerCase())) return false;
      if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;
      if (subjectFilter !== "all" && t.subject !== subjectFilter) return false;
      if (statusFilter === "pending" && t.completed) return false;
      if (statusFilter === "completed" && !t.completed) return false;
      return true;
    });
  }, [tasks, search, priorityFilter, subjectFilter, statusFilter]);

  const viewBtnClass = (active: boolean) =>
    `inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
      active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"
    }`;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-bold tracking-tight">StudyPlanner</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setView("list")} className={viewBtnClass(view === "list")}>
              <List className="h-4 w-4" /> List
            </button>
            <button onClick={() => setView("calendar")} className={viewBtnClass(view === "calendar")}>
              <CalendarDays className="h-4 w-4" /> Calendar
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-5 px-4 py-8">
        {rawTasks.length > 0 && <StatsBar tasks={rawTasks} />}

        <AddTaskForm onAdd={addTask} />

        {rawTasks.length > 0 && (
          <TaskFilters
            search={search}
            onSearchChange={setSearch}
            priorityFilter={priorityFilter}
            onPriorityChange={setPriorityFilter}
            subjectFilter={subjectFilter}
            onSubjectChange={setSubjectFilter}
            subjects={subjects}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />
        )}

        {view === "calendar" ? (
          <CalendarView tasks={filteredTasks} />
        ) : filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
            <ClipboardList className="h-12 w-12 mb-3 opacity-40" />
            <p className="text-lg font-medium">{rawTasks.length === 0 ? "No tasks yet" : "No matching tasks"}</p>
            <p className="text-sm">
              {rawTasks.length === 0 ? "Add your first task above to get started." : "Try adjusting your filters."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={setEditingTask}
              />
            ))}
          </div>
        )}
      </main>

      {editingTask && (
        <EditTaskDialog
          task={editingTask}
          onSave={editTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
};

export default Index;
