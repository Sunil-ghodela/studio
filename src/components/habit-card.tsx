"use client";

import { Check, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Habit } from "@/lib/types";
import { cn } from "@/lib/utils";
import { getTodayDateString } from "@/lib/date-utils";

interface HabitCardProps {
    habit: Habit;
    onToggleComplete: (habitId: string) => void;
}

export default function HabitCard({ habit, onToggleComplete }: HabitCardProps) {
    const today = getTodayDateString();
    const isCompletedToday = habit.completions.includes(today);

    // Basic streak calculation
    const streak = habit.completions.length; 
    
    return (
        <Card className="flex flex-row items-center justify-between p-3">
            <div className="flex items-center gap-3">
                <Button 
                    variant={isCompletedToday ? "default" : "outline"}
                    size="icon"
                    onClick={() => onToggleComplete(habit.id)}
                    className={cn(
                        "h-9 w-9 shrink-0 rounded-full",
                        isCompletedToday ? "bg-green-500 text-white hover:bg-green-600" : "border-gray-300"
                    )}
                    aria-label={isCompletedToday ? `Mark ${habit.name} as not completed` : `Mark ${habit.name} as completed`}
                >
                    <Check className="h-4 w-4"/>
                </Button>
                <p className="font-medium">{habit.name}</p>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
                <Flame className={cn("h-5 w-5", streak > 0 ? "text-accent" : "text-muted-foreground")} />
                <span className="font-semibold text-sm">{streak}</span>
            </div>
        </Card>
    )
}
