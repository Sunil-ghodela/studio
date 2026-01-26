"use client";

import { Button } from "@/components/ui/button";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Edit, PlusCircle, Target, Trash2 } from "lucide-react";
import type { GoalCategory, Habit, LifeGoal } from "@/lib/types";
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
}

const categoryColors: Record<GoalCategory, string> = {
    Personal: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
    Career: "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
    Health: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    Marriage: "bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300",
    Children: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
};

export default function LifeGoalCard({
    goal,
    habits,
    onEditGoal,
    onDeleteGoal,
    onAddHabit,
    onToggleHabitComplete
}: LifeGoalCardProps) {
    const goalHabits = habits.filter(h => h.goalId === goal.id);

    return (
        <AccordionItem value={goal.id} className="border-b-0 mb-4 rounded-lg border bg-card shadow-sm overflow-hidden">
            <AccordionTrigger className="p-4 hover:no-underline">
                <div className="flex items-center gap-4">
                    <Target className="h-6 w-6 text-primary" />
                    <div className="text-left">
                        <p className="font-semibold">{goal.title}</p>
                        <Badge variant="outline" className={`mt-1 border-transparent hover:bg-transparent ${categoryColors[goal.category]}`}>{goal.category}</Badge>
                    </div>
                </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-0 space-y-4">
                {goal.description && <p className="text-muted-foreground">{goal.description}</p>}
                
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEditGoal(goal)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit Goal
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                             <Button variant="outline" size="sm" className="text-destructive border-destructive/50 hover:bg-destructive/5 hover:text-destructive dark:border-destructive/50 dark:hover:bg-destructive/5">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete Goal
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
                    <Button variant="ghost" className="mt-2 w-full justify-start text-muted-foreground hover:text-foreground" onClick={() => onAddHabit(goal.id)}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Habit
                    </Button>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}
