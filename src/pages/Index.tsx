import { useTasks } from "@/hooks/useTasks";
import { AddTaskForm } from "@/components/AddTaskForm";
import { TaskCard } from "@/components/TaskCard";
import { ClipboardList, GraduationCap } from "lucide-react";

const Index = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-bold tracking-tight">StudyPlanner</h1>
          </div>
          {tasks.length > 0 && (
            <span className="text-sm text-muted-foreground">
              {completedCount}/{tasks.length} done
            </span>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
        <AddTaskForm onAdd={addTask} />

        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
            <ClipboardList className="h-12 w-12 mb-3 opacity-40" />
            <p className="text-lg font-medium">No tasks yet</p>
            <p className="text-sm">Add your first task above to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
