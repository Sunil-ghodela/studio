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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { Affirmation } from "@/lib/types";

const formSchema = z.object({
  text: z.string().min(10, "Affirmation must be at least 10 characters long."),
});

type AddAffirmationFormValues = z.infer<typeof formSchema>;

interface AddAffirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  affirmation?: Affirmation | null;
  onSave: (data: AddAffirmationFormValues) => void;
}

export function AddAffirmationDialog({ open, onOpenChange, affirmation, onSave }: AddAffirmationDialogProps) {
  const { toast } = useToast();

  const form = useForm<AddAffirmationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: affirmation?.text ?? "",
    },
  });

  const onSubmit = (data: AddAffirmationFormValues) => {
    onSave(data);
    onOpenChange(false);
    toast({
      title: affirmation ? "Affirmation updated" : "Affirmation created",
      description: "Your affirmation has been saved.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{affirmation ? "Edit Affirmation" : "Create a new affirmation"}</DialogTitle>
          <DialogDescription>
            {affirmation ? "Update your daily affirmation." : "Write a positive statement to inspire yourself."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Affirmation</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., I am worthy of success and happiness."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">Save Affirmation</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
