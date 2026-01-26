"use client";

import { useState, useMemo } from "react";
import { PlusCircle, ListTodo, CheckCircle2, ClipboardList, HeartHandshake } from "lucide-react";
import type { Task, Plan, LifeGoal, Habit, GoalStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import TaskCard from "@/components/task-card";
import { AddTaskDialog } from "@/components/add-task-dialog";
import TaskProgress from "@/components/task-progress";
import Logo from "@/components/logo";
import { AddPlanDialog } from "@/components/add-plan-dialog";
import PlanCard from "@/components/plan-card";
import { AddLifeGoalDialog } from "@/components/add-life-goal-dialog";
import LifeGoalCard from "@/components/life-goal-card";
import { Accordion } from "@/components/ui/accordion";
import { AddHabitDialog } from "@/components/add-habit-dialog";
import { getTodayDateString } from "@/lib/date-utils";
import SummaryCard from "@/components/summary-card";

const initialPlans: Plan[] = [
    {
        id: 'plan-1',
        title: 'Q3 Marketing Campaign',
        description: 'All tasks related to the Q3 marketing campaign.',
    },
    {
        id: 'plan-2',
        title: 'Website Redesign',
        description: 'Tasks for the upcoming website redesign project.',
    },
];

const initialTasks: Task[] = [
  {
    id: "task-1",
    planId: "plan-1",
    title: "Finalize Q3 marketing report",
    description: "Review the latest analytics and compile the final report for the Q3 marketing campaign. Circulate to the team for feedback before the EOD.",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    priority: "High",
    completed: false,
    files: [],
    completedAt: null,
  },
  {
    id: "task-2",
    title: "Team lunch coordination",
    description: "Organize a team lunch for next Friday. Poll the team for preferences and make a reservation.",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    priority: "Low",
    completed: false,
    files: [],
    completedAt: null,
  },
  {
    id: "task-3",
    planId: "plan-2",
    title: "Update project documentation",
    description: "Add new API endpoints to the project documentation and update the setup guide.",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
    priority: "Medium",
    completed: true,
    files: [
      { id: "file-1", name: "Project-Plan.pdf", url: "#", type: "document" }
    ],
    completedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
    {
    id: "task-4",
    planId: "plan-1",
    title: "Review video drafts",
    description: "Go through the video drafts for the new ad campaign and provide feedback to the creative team.",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    priority: "High",
    completed: false,
    files: [
        { id: "file-2", name: "ad_campaign_v1.mp4", url: "#", type: "video" }
    ],
    completedAt: null,
    },
];

const initialLifeGoals: LifeGoal[] = [
    {
        id: 'goal-1',
        title: 'Learn to play the guitar',
        description: 'Practice every day to be able to play my favorite songs.',
        category: 'Personal',
        status: 'In Progress',
        targetDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    },
    {
        id: 'goal-2',
        title: 'Run a 5k',
        description: 'Train consistently to improve my running endurance and speed.',
        category: 'Health',
        status: 'In Progress',
        targetDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    },
     {
        id: 'goal-3',
        title: 'Read 12 books',
        description: 'Finish one book every month.',
        category: 'Personal',
        status: 'Achieved',
        targetDate: new Date(new Date().setFullYear(new Date().getFullYear(), 11, 31)),
    }
]

const initialHabits: Habit[] = [
    {
        id: 'habit-1',
        goalId: 'goal-1',
        name: 'Practice chords for 15 minutes',
        completions: [getTodayDateString()],
    },
    {
        id: 'habit-2',
        goalId: 'goal-2',
        name: 'Go for a 30-minute run',
        completions: [getTodayDateString()],
    },
    {
        id: 'habit-3',
        goalId: 'goal-1',
        name: 'Learn a new song',
        completions: [],
    }
]


export default function Home() {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [lifeGoals, setLifeGoals] = useState<LifeGoal[]>(initialLifeGoals);
  const [habits, setHabits] = useState<Habit[]>(initialHabits);

  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [isAddPlanDialogOpen, setIsAddPlanDialogOpen] = useState(false);
  const [isAddLifeGoalDialogOpen, setIsAddLifeGoalDialogOpen] = useState(false);
  const [isAddHabitDialogOpen, setIsAddHabitDialogOpen] = useState(false);
  
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [editingLifeGoal, setEditingLifeGoal] = useState<LifeGoal | null>(null);
  const [activeGoalIdForHabit, setActiveGoalIdForHabit] = useState<string | null>(null);
  
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const handleOpenAddTaskDialogForNew = () => {
    setEditingTask(null);
    setIsAddTaskDialogOpen(true);
  };

  const handleOpenAddTaskDialogForEdit = (task: Task) => {
    setEditingTask(task);
    setIsAddTaskDialogOpen(true);
  };

  const handleOpenPlanDialogForNew = () => {
    setEditingPlan(null);
    setIsAddPlanDialogOpen(true);
  };

  const handleOpenPlanDialogForEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setIsAddPlanDialogOpen(true);
  };

  const handleOpenLifeGoalDialogForNew = () => {
    setEditingLifeGoal(null);
    setIsAddLifeGoalDialogOpen(true);
  }

  const handleOpenLifeGoalDialogForEdit = (goal: LifeGoal) => {
    setEditingLifeGoal(goal);
    setIsAddLifeGoalDialogOpen(true);
  }

  const handleOpenAddHabitDialog = (goalId: string) => {
    setActiveGoalIdForHabit(goalId);
    setIsAddHabitDialogOpen(true);
  }

  const handleSaveTask = (data: { title: string; description?: string; dueDate: Date; priority: "Low" | "Medium" | "High"; files: FileList | null; planId?: string; }) => {
    const taskData = {
        ...data,
        planId: data.planId === '' ? undefined : data.planId,
    };

    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === editingTask.id ? { ...editingTask, ...taskData, files: t.files } : t)));
    } else {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: taskData.title,
        description: taskData.description,
        dueDate: taskData.dueDate,
        priority: taskData.priority,
        planId: taskData.planId,
        completed: false,
        completedAt: null,
        files: data.files && data.files.length > 0 ? Array.from(data.files).map(f => ({ id: `file-${Date.now()}`, name: f.name, url: '#', type: f.type.startsWith('video') ? 'video' : 'document' })) : []
      };
      setTasks([newTask, ...tasks]);
    }
  };

  const handleSavePlan = (planData: Omit<Plan, 'id'>) => {
    if (editingPlan) {
      setPlans(plans.map(p => p.id === editingPlan.id ? { ...editingPlan, ...planData } : p));
    } else {
      const newPlan: Plan = {
        id: `plan-${Date.now()}`,
        ...planData,
      };
      setPlans([newPlan, ...plans]);
    }
  }

   const handleSaveLifeGoal = (goalData: Omit<LifeGoal, 'id'>) => {
    if (editingLifeGoal) {
        setLifeGoals(goals => goals.map(g => g.id === editingLifeGoal.id ? {...editingLifeGoal, ...goalData} : g));
    } else {
        const newGoal: LifeGoal = {
            id: `goal-${Date.now()}`,
            ...goalData
        };
        setLifeGoals(goals => [newGoal, ...goals]);
    }
  }

  const handleUpdateGoalStatus = (goalId: string, status: GoalStatus) => {
    setLifeGoals(goals => goals.map(g => g.id === goalId ? { ...g, status } : g));
  }

  const handleSaveHabit = (habitData: { name: string }) => {
    if (!activeGoalIdForHabit) return;
    const newHabit: Habit = {
        id: `habit-${Date.now()}`,
        goalId: activeGoalIdForHabit,
        name: habitData.name,
        completions: [],
    };
    setHabits(h => [newHabit, ...h]);
    setActiveGoalIdForHabit(null);
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const handleDeletePlan = (planId: string) => {
    setPlans(plans.filter((p) => p.id !== planId));
    setTasks(tasks.map((t) => t.planId === planId ? {...t, planId: undefined} : t));
    if (selectedPlanId === planId) {
        setSelectedPlanId(null);
    }
  };

  const handleDeleteLifeGoal = (goalId: string) => {
    setLifeGoals(goals => goals.filter(g => g.id !== goalId));
    setHabits(h => h.filter(habit => habit.goalId !== goalId));
  }

  const handleToggleComplete = (taskId: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed, completedAt: !t.completed ? new Date() : null } : t
      )
    );
  };
  
  const handleToggleHabitComplete = (habitId: string) => {
    const today = getTodayDateString();
    setHabits(habits => habits.map(habit => {
        if (habit.id === habitId) {
            const newCompletions = habit.completions.includes(today)
                ? habit.completions.filter(c => c !== today)
                : [...habit.completions, today];
            return { ...habit, completions: newCompletions };
        }
        return habit;
    }))
  }

  const { todoTasks, completedTasks } = useMemo(() => {
    const filteredTasks = selectedPlanId ? tasks.filter(t => t.planId === selectedPlanId) : tasks.filter(t => !t.planId);
    const sortedTasks = [...filteredTasks].sort((a, b) => b.dueDate.getTime() - a.dueDate.getTime());
    return {
      todoTasks: sortedTasks.filter((t) => !t.completed),
      completedTasks: sortedTasks.filter((t) => t.completed),
    };
  }, [tasks, selectedPlanId]);

  const totalPlans = plans.length;
  const allTodoTasksCount = tasks.filter(t => !t.completed).length;
  const inProgressGoals = lifeGoals.filter(g => g.status === 'In Progress').length;

  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
          <div className="flex items-center gap-2">
            <Logo />
            <h1 className="text-xl font-bold tracking-tight">TaskMaster</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
             <Button onClick={handleOpenLifeGoalDialogForNew} variant="outline">
              <PlusCircle />
              <span>Add Goal</span>
            </Button>
            <Button onClick={handleOpenPlanDialogForNew} variant="outline">
              <PlusCircle />
              <span>Add Plan</span>
            </Button>
            <Button onClick={handleOpenAddTaskDialogForNew}>
              <PlusCircle />
              <span>Add Task</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 space-y-8 p-4 sm:p-6 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <SummaryCard
                    title="Active Plans"
                    value={totalPlans}
                    icon={<ClipboardList className="h-4 w-4 text-muted-foreground" />}
                    href="#plans-section"
                />
                <SummaryCard
                    title="Pending Tasks"
                    value={allTodoTasksCount}
                    icon={<ListTodo className="h-4 w-4 text-muted-foreground" />}
                    href="#todo-section"
                />
                <SummaryCard
                    title="In-Progress Goals"
                    value={inProgressGoals}
                    icon={<HeartHandshake className="h-4 w-4 text-muted-foreground" />}
                    href="#life-goals-section"
                />
            </div>
           <TaskProgress tasks={selectedPlanId ? tasks.filter(t => t.planId === selectedPlanId) : tasks} />
          
           <div id="plans-section">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold tracking-tight">
              <ClipboardList className="text-primary" />
              <span>Plans</span>
            </h2>
            {plans.length > 0 ? (
               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    tasks={tasks}
                    onSelectPlan={setSelectedPlanId}
                    onEdit={handleOpenPlanDialogForEdit}
                    onDelete={handleDeletePlan}
                    isSelected={selectedPlanId === plan.id}
                  />
                ))}
              </div>
            ) : (
                <p className="text-muted-foreground">No plans yet. Create one to get started!</p>
            )}
          </div>
          
          <div id="life-goals-section">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold tracking-tight">
                <HeartHandshake className="text-primary" />
                <span>Life Goals</span>
            </h2>
             {lifeGoals.length > 0 ? (
                <Accordion type="multiple" className="w-full space-y-0">
                    {lifeGoals.map(goal => (
                        <LifeGoalCard
                            key={goal.id}
                            goal={goal}
                            habits={habits}
                            onEditGoal={handleOpenLifeGoalDialogForEdit}
                            onDeleteGoal={handleDeleteLifeGoal}
                            onAddHabit={handleOpenAddHabitDialog}
                            onToggleHabitComplete={handleToggleHabitComplete}
                            onUpdateGoalStatus={handleUpdateGoalStatus}
                        />
                    ))}
                </Accordion>
             ) : (
                <p className="text-muted-foreground">No life goals yet. Add one to start your journey!</p>
             )}
          </div>

          <div id="todo-section">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold tracking-tight">
              <ListTodo className="text-primary" />
              <span>To-Do {selectedPlanId ? `- ${plans.find(p => p.id === selectedPlanId)?.title}` : '- Unplanned'}</span>
            </h2>
            {todoTasks.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {todoTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleOpenAddTaskDialogForEdit}
                    onDelete={handleDeleteTask}
                    onToggleComplete={handleToggleComplete}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">{selectedPlanId ? 'No to-do tasks in this plan.' : "You're all caught up with unplanned tasks!"}</p>
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
                    onEdit={handleOpenAddTaskDialogForEdit}
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
        open={isAddTaskDialogOpen}
        onOpenChange={setIsAddTaskDialogOpen}
        task={editingTask}
        onSave={handleSaveTask}
        plans={plans}
      />
      <AddPlanDialog
        key={editingPlan?.id ?? "new-plan"}
        open={isAddPlanDialogOpen}
        onOpenChange={setIsAddPlanDialogOpen}
        plan={editingPlan}
        onSave={handleSavePlan}
      />
      <AddLifeGoalDialog 
        key={editingLifeGoal?.id ?? "new-goal"}
        open={isAddLifeGoalDialogOpen}
        onOpenChange={setIsAddLifeGoalDialogOpen}
        goal={editingLifeGoal}
        onSave={handleSaveLifeGoal}
      />
      <AddHabitDialog
        open={isAddHabitDialogOpen}
        onOpenChange={setIsAddHabitDialogOpen}
        onSave={handleSaveHabit}
      />
    </>
  );
}
