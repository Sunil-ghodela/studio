"use client";

import { useState, useMemo } from "react";
import { PlusCircle, ListTodo, CheckCircle2 } from "lucide-react";
import type { Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import TaskCard from "@/components/task-card";
import { AddTaskDialog } from "@/components/add-task-dialog";
import TaskProgress from "@/components/task-progress";
import Logo from "@/components/logo";

const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Finalize Q3 marketing report",
    description: "Review the latest analytics and compile the final report for the Q3 marketing campaign. Circulate to the team for feedback before the EOD.",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    priority: "High",
    completed: false,
    files: [],
  },
  {
    id: "task-2",
    title: "Team lunch coordination",
    description: "Organize a team lunch for next Friday. Poll the team for preferences and make a reservation.",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    priority: "Low",
    completed: false,
    files: [],
  },
  {
    id: "task-3",
    title: "Update project documentation",
    description: "Add new API endpoints to the project documentation and update the setup guide.",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
    priority: "Medium",
    completed: true,
    files: [
      { id: "file-1", name: "Project-Plan.pdf", url: "#", type: "document" }
    ],
  },
    {
    id: "task-4",
    title: "Review video drafts",
    description: "Go through the video drafts for the new ad campaign and provide feedback to the creative team.",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    priority: "High",
    completed: false,
    files: [
        { id: "file-2", name: "ad_campaign_v1.mp4", url: "#", type: "video" }
    ],
    },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleOpenDialogForNew = () => {
    setEditingTask(null);
    setIsDialogOpen(true);
  };

  const handleOpenDialogForEdit = (task: Task) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'completed' | 'files'> & { files: FileList | null }) => {
    if (editingTask) {
      // Edit existing task
      setTasks(tasks.map((t) => (t.id === editingTask.id ? { ...editingTask, ...taskData, files: t.files } : t)));
    } else {
      // Add new task
      const newTask: Task = {
        id: `task-${Date.now()}`,
        ...taskData,
        completed: false,
        files: taskData.files && taskData.files.length > 0 ? Array.from(taskData.files).map(f => ({ id: `file-${Date.now()}`, name: f.name, url: '#', type: f.type.startsWith('video') ? 'video' : 'document' })) : []
      };
      setTasks([newTask, ...tasks]);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const { todoTasks, completedTasks } = useMemo(() => {
    const sortedTasks = [...tasks].sort((a, b) => b.dueDate.getTime() - a.dueDate.getTime());
    return {
      todoTasks: sortedTasks.filter((t) => !t.completed),
      completedTasks: sortedTasks.filter((t) => t.completed),
    };
  }, [tasks]);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
          <div className="flex items-center gap-2">
            <Logo />
            <h1 className="text-xl font-bold tracking-tight">TaskMaster</h1>
          </div>
          <div className="ml-auto">
            <Button onClick={handleOpenDialogForNew}>
              <PlusCircle />
              <span>Add Task</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 space-y-8 p-4 sm:p-6 md:p-8">
          <TaskProgress tasks={tasks} />

          <div>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold tracking-tight">
              <ListTodo className="text-primary" />
              <span>To-Do</span>
            </h2>
            {todoTasks.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {todoTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleOpenDialogForEdit}
                    onDelete={handleDeleteTask}
                    onToggleComplete={handleToggleComplete}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">You're all caught up!</p>
            )}
          </div>
          
          {completedTasks.length > 0 && (
            <div>
              <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold tracking-tight">
                <CheckCircle2 className="text-green-500" />
                <span>Completed</span>
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {completedTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleOpenDialogForEdit}
                    onDelete={handleDeleteTask}
                    onToggleComplete={handleToggleComplete}
                  />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
      <AddTaskDialog
        key={editingTask?.id ?? "new"}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        task={editingTask}
        onSave={handleSaveTask}
      />
    </>
  );
}