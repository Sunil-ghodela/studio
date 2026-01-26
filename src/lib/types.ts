export type Priority = "Low" | "Medium" | "High";

export interface TaskFile {
  id: string;
  name: string;
  url: string;
  type: "video" | "image" | "document";
}

export interface Plan {
  id: string;
  title: string;
  description?: string;
}

export interface Affirmation {
  id: string;
  text: string;
}

export interface Task {
  id: string;
  planId?: string;
  title: string;
  description?: string;
  dueDate: Date;
  priority: Priority;
  completed: boolean;
  files: TaskFile[];
  completedAt?: Date | null;
}

export type GoalCategory = "Personal" | "Health" | "Career" | "Marriage" | "Children";
export type GoalStatus = "In Progress" | "Achieved" | "On Hold";

export interface Habit {
    id: string;
    goalId: string;
    name: string;
    completions: string[]; // Array of 'YYYY-MM-DD' date strings
}

export interface LifeGoal {
    id: string;
    title: string;
    description?: string;
    category: GoalCategory;
    status: GoalStatus;
    targetDate?: Date;
}
