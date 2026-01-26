export type Priority = "Low" | "Medium" | "High";

export interface TaskFile {
  id: string;
  name: string;
  url: string;
  type: "video" | "image" | "document";
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: Priority;
  completed: boolean;
  files: TaskFile[];
}
