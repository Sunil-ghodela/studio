"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Wand2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import type { VisionBoard, VisionBoardItem } from "@/lib/types";
import VisionBoardItemCard from "./vision-board-item-card";
import { generateVisionImageAction } from "@/app/actions";
import { ScrollArea } from "./ui/scroll-area";


interface VisionBoardSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  board: VisionBoard;
  items: VisionBoardItem[];
  onAddItem: (boardId: string, prompt: string, imageUrl: string) => void;
  onDeleteItem: (itemId: string) => void;
}

const formSchema = z.object({
  prompt: z.string().min(5, "Prompt must be at least 5 characters long."),
});
type FormValues = z.infer<typeof formSchema>;

export default function VisionBoardSheet({
  open,
  onOpenChange,
  board,
  items,
  onAddItem,
  onDeleteItem,
}: VisionBoardSheetProps) {
  const { toast } = useToast();
  const [isAIPending, startAITransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });

  const onSubmit = (data: FormValues) => {
    startAITransition(async () => {
      try {
        const imageUrl = await generateVisionImageAction(data.prompt);
        onAddItem(board.id, data.prompt, imageUrl);
        form.reset();
        toast({
          title: "Image Added!",
          description: "Your new image has been added to the board.",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Image Generation Failed",
          description: "Could not generate an image. Please try again.",
        });
      }
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl flex flex-col">
        <SheetHeader>
          <SheetTitle>{board.title}</SheetTitle>
          <SheetDescription>
            Add and manage the images on your vision board. Use the form below to generate new images with AI.
          </SheetDescription>
        </SheetHeader>
        
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2 py-4">
                 <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                        <FormControl>
                             <Input placeholder="e.g., 'A cozy cabin in the woods during winter'" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <Button type="submit" disabled={isAIPending}>
                    {isAIPending ? <Loader2 className="animate-spin" /> : <Wand2 />}
                    <span>Generate</span>
                </Button>
            </form>
        </Form>
        
        <ScrollArea className="flex-1 -mx-6">
            <div className="px-6">
                 {items.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {items.map((item) => (
                    <VisionBoardItemCard
                        key={item.id}
                        item={item}
                        onDelete={onDeleteItem}
                    />
                    ))}
                </div>
                ) : (
                <div className="flex flex-col items-center justify-center h-full text-center rounded-lg border-2 border-dashed border-muted-foreground/20 py-12">
                    <h3 className="text-lg font-semibold">Your Vision Board is Empty</h3>
                    <p className="text-sm text-muted-foreground">Generate your first image to get started.</p>
                </div>
                )}
            </div>
        </ScrollArea>
        
        <SheetFooter className="mt-auto pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
