"use client";

import { Sparkles, Trash2, Edit, MoreVertical, Quote } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Affirmation } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AffirmationCardProps {
  affirmation: Affirmation;
  onEdit: (affirmation: Affirmation) => void;
  onDelete: (affirmationId: string) => void;
}

export default function AffirmationCard({ affirmation, onEdit, onDelete }: AffirmationCardProps) {

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-accent" />
                <h3 className="font-semibold">Daily Affirmation</h3>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(affirmation)}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(affirmation.id)}
                  className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center items-center text-center">
        <Quote className="h-6 w-6 text-muted-foreground/50 transform -scale-x-100" />
        <p className="text-lg font-medium italic text-foreground/80 my-4">
            {affirmation.text}
        </p>
        <Quote className="h-6 w-6 text-muted-foreground/50 self-end" />
      </CardContent>
    </Card>
  );
}
