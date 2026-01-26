"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { LifeGoal, GoalCategory } from "@/lib/types";

const goalCategories: GoalCategory[] = ["Personal", "Health", "Career", "Marriage", "Children"];

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  description: z.string().optional(),
  category: z.enum(goalCategories),
});

type AddLifeGoalFormValues = z.infer<typeof formSchema>;

interface AddLifeGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goal?: LifeGoal | null;
  onSave: (data: AddLifeGoalFormValues) => void;
}

export function AddLifeGoalDialog({ open, onOpenChange, goal, onSave }: AddLifeGoalDialogProps) {
  const { toast } = useToast();

  const form = useForm<AddLifeGoalFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: goal?.title ?? "",
      description: goal?.description ?? "",
      category: goal?.category ?? "Personal",
    },
  });

  const onSubmit = (data: AddLifeGoalFormValues) => {
    onSave(data);
    onOpenChange(false);
    toast({
      title: goal ? "Goal updated" : "Goal created",
      description: `"${data.title}" has been saved.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{goal ? "Edit Life Goal" : "Create a new Life Goal"}</DialogTitle>
          <DialogDescription>
            Define your long-term ambitions and dreams.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Run a marathon" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                          <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                          {goalCategories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                      </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Why is this goal important to you?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">Save Goal</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
