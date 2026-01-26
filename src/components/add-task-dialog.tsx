"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Wand2, Loader2, Paperclip } from "lucide-react";
import { useTransition } from "react";

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
  FormDescription,
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { Task, Priority, Plan } from "@/lib/types";
import { getPrioritySuggestion } from "@/app/actions";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  description: z.string().optional(),
  dueDate: z.date(),
  priority: z.enum(["Low", "Medium", "High"]),
  files: z.any().optional(),
  planId: z.string().optional(),
});

type AddTaskFormValues = z.infer<typeof formSchema>;

interface AddTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
  onSave: (data: AddTaskFormValues) => void;
  plans: Plan[];
}

export function AddTaskDialog({ open, onOpenChange, task, onSave, plans }: AddTaskDialogProps) {
  const { toast } = useToast();
  const [isAIPending, startAITransition] = useTransition();

  const form = useForm<AddTaskFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      dueDate: task?.dueDate ?? new Date(),
      priority: task?.priority ?? "Medium",
      files: null,
      planId: task?.planId ?? "",
    },
  });
  
  const fileRef = form.register("files");

  const onSubmit = (data: AddTaskFormValues) => {
    onSave(data);
    onOpenChange(false);
    toast({
      title: task ? "Task updated" : "Task created",
      description: `"${data.title}" has been saved.`,
    });
  };

  const handleSuggestPriority = () => {
    const description = form.getValues("description");
    if (!description) {
      toast({
        variant: "destructive",
        title: "No description provided",
        description: "Please write a description to get an AI priority suggestion.",
      });
      return;
    }

    startAITransition(async () => {
      try {
        const priority = await getPrioritySuggestion(description);
        form.setValue("priority", priority as Priority, { shouldValidate: true });
        toast({
          title: "AI Suggestion",
          description: `Priority set to "${priority}".`,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "AI Suggestion Failed",
          description: "Could not get a priority suggestion. Please try again.",
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Add a new task"}</DialogTitle>
          <DialogDescription>
            {task ? "Update the details of your task." : "Fill in the details below to add a new task."}
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
                    <Input placeholder="e.g., Finish marketing report" {...field} />
                  </FormControl>
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
                      placeholder="Add more details about your task..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="planId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                          <SelectTrigger>
                              <SelectValue placeholder="Assign to a plan (optional)" />
                          </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                          <SelectItem value="">None</SelectItem>
                          {plans.map(plan => (
                            <SelectItem key={plan.id} value={plan.id}>{plan.title}</SelectItem>
                          ))}
                      </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <div className="flex gap-2">
                       <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                              <SelectTrigger>
                                  <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                              <SelectItem value="Low">Low</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="High">High</SelectItem>
                          </SelectContent>
                      </Select>
                      <Button variant="outline" size="icon" type="button" onClick={handleSuggestPriority} disabled={isAIPending} aria-label="Suggest Priority">
                          {isAIPending ? <Loader2 className="animate-spin"/> : <Wand2 />}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
              control={form.control}
              name="files"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attachments</FormLabel>
                   <FormControl>
                      <div className="relative">
                        <Paperclip className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="file" {...fileRef} className="pl-9" />
                      </div>
                   </FormControl>
                  <FormDescription>Attach relevant files or videos.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">Save Task</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
