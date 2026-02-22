export type Priority = "high" | "medium" | "low";

export interface Task {
  id: string;
  title: string;
  subject: string;
  priority: Priority;
  dueDate: string;
  completed: boolean;
  createdAt: string;
}
