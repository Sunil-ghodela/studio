"use client";

import { Button } from "@/components/ui/button";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { getTodayDateString } from "@/lib/date-utils";
import { format, formatDistanceToNow } from "date-fns";
import { Edit, PlusCircle, Target, Trash2, Trophy, CheckCircle2, Calendar } from "lucide-react";
import type { GoalCategory, Habit, LifeGoal, GoalStatus } from "@/lib/types";
import HabitCard from "./habit-card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "./ui/separator";


interface LifeGoalCardProps {
    goal: LifeGoal;
    habits: Habit[];
    onEditGoal: (goal: LifeGoal) => void;
    onDeleteGoal: (goalId: string) => void;
    onAddHabit: (goalId: string) => void;
    onToggleHabitComplete: (habitId: string) => void;
    onUpdateGoalStatus: (goalId: string, status: GoalStatus) => void;
}

const categoryColors: Record<GoalCategory, string> = {
    Personal: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
    Career: "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
    Health: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    Marriage: "bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300",
    Children: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
};

const statusColors: Record<GoalStatus, string> = {
    "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
    "Achieved": "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    "On Hold": "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300",
};


export default function LifeGoalCard({
    goal,
    habits,
    onEditGoal,
    onDeleteGoal,
    onAddHabit,
    onToggleHabitComplete,
    onUpdateGoalStatus,
}: LifeGoalCardProps) {
    const goalHabits = habits.filter(h => h.goalId === goal.id);
    const today = getTodayDateString();
    const completedHabitsToday = goalHabits.filter(h => h.completions.includes(today)).length;
    const progress = goalHabits.length > 0 ? Math.round((completedHabitsToday / goalHabits.length) * 100) : 0;
    const isAchieved = goal.status === 'Achieved';

    return (
        <AccordionItem value={goal.id} className="border-b-0 mb-4 rounded-lg border bg-card shadow-sm overflow-hidden">
            <AccordionTrigger className="p-4 hover:no-underline" disabled={isAchieved}>
                <div className="flex items-center gap-4">
                     {isAchieved ? <Trophy className="h-6 w-6 text-accent" /> : <Target className="h-6 w-6 text-primary" />}
                    <div className="text-left">
                        <p className={cn("font-semibold", isAchieved && "line-through text-muted-foreground")}>{goal.title}</p>
                         <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className={cn("border-transparent", statusColors[goal.status])}>{goal.status}</Badge>
                            <Badge variant="outline" className={cn("border-transparent", categoryColors[goal.category])}>{goal.category}</Badge>
                         </div>
                    </div>
                </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-0 space-y-4">
                {goal.description && <p className="text-muted-foreground">{goal.description}</p>}
                {goal.targetDate && (
                    <div className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                        <Calendar className="h-4 w-4" />
                        <span>Target: {format(goal.targetDate, "PPP")} ({formatDistanceToNow(goal.targetDate, { addSuffix: true })})</span>
                    </div>
                )}

                 {goalHabits.length > 0 && (
                    <div className="mt-4 space-y-2">
                        <h4 className="font-semibold text-sm">Today's Progress</h4>
                        <Progress value={progress} />
                        <p className="text-xs text-muted-foreground">{completedHabitsToday} of {goalHabits.length} habits completed today.</p>
                    </div>
                )}
                
                <div className="flex items-center gap-2 mt-4">
                    {!isAchieved && (
                        <Button variant="outline" size="sm" onClick={() => onUpdateGoalStatus(goal.id, 'Achieved')}>
                            <CheckCircle2 className="mr-2 h-4 w-4" /> Mark as Achieved
                        </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => onEditGoal(goal)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                             <Button variant="outline" size="sm" className="text-destructive border-destructive/50 hover:bg-destructive/5 hover:text-destructive dark:border-destructive/50 dark:hover:bg-destructive/5">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your life goal and all associated habits.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDeleteGoal(goal.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                
                <Separator />

                <div className="space-y-2">
                    <h4 className="font-semibold">Habit Tracker</h4>
                    {goalHabits.length > 0 ? (
                        <div className="space-y-2">
                        {goalHabits.map(habit => (
                            <HabitCard key={habit.id} habit={habit} onToggleComplete={onToggleHabitComplete} />
                        ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">No habits for this goal yet.</p>
                    )}
                    {!isAchieved && (
                        <Button variant="ghost" className="mt-2 w-full justify-start text-muted-foreground hover:text-foreground" onClick={() => onAddHabit(goal.id)}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Habit
                        </Button>
                    )}
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}
