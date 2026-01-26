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
import { useToast } from "@/hooks/use-toast";
import type { VisionBoard } from "@/lib/types";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
});

type AddVisionBoardFormValues = z.infer<typeof formSchema>;

interface AddVisionBoardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  board?: VisionBoard | null;
  onSave: (data: AddVisionBoardFormValues) => void;
}

export function AddVisionBoardDialog({ open, onOpenChange, board, onSave }: AddVisionBoardDialogProps) {
  const { toast } = useToast();

  const form = useForm<AddVisionBoardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: board?.title ?? "",
    },
  });

  const onSubmit = (data: AddVisionBoardFormValues) => {
    onSave(data);
    onOpenChange(false);
    toast({
      title: board ? "Vision Board updated" : "Vision Board created",
      description: `"${data.title}" has been saved.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{board ? "Edit Vision Board" : "Create a new Vision Board"}</DialogTitle>
          <DialogDescription>
            {board ? "Update the title of your vision board." : "Give your new vision board a title to get started."}
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
                    <Input placeholder="e.g., My Dream Life" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">Save Vision Board</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
