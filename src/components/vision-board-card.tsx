"use client";

import Image from "next/image";
import { GalleryHorizontal, Trash2, Edit, MoreVertical, ImagePlus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { VisionBoard, VisionBoardItem } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface VisionBoardCardProps {
  board: VisionBoard;
  items: VisionBoardItem[];
  onSelectBoard: (board: VisionBoard) => void;
  onEdit: (board: VisionBoard) => void;
  onDelete: (boardId: string) => void;
}

export default function VisionBoardCard({ board, items, onSelectBoard, onEdit, onDelete }: VisionBoardCardProps) {
  const previewImage = items[0]?.imageUrl;
  const visionBoardPlaceholder = PlaceHolderImages.find(img => img.id === 'vision-board-placeholder-1');

  return (
    <Card
      onClick={() => onSelectBoard(board)}
      className="cursor-pointer transition-all hover:shadow-md overflow-hidden flex flex-col"
    >
      <CardHeader>
        <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
                <GalleryHorizontal className="h-6 w-6 text-primary" />
                <div>
                    <CardTitle>{board.title}</CardTitle>
                    <CardDescription className="mt-1">{items.length} {items.length === 1 ? 'item' : 'items'}</CardDescription>
                </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem onClick={() => onEdit(board)}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(board.id)}
                  className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-center bg-muted/30">
        {previewImage ? (
           <div className="relative w-full h-40">
             <Image
                src={previewImage}
                alt={board.title}
                fill
                className="object-cover"
            />
           </div>
        ) : (
            visionBoardPlaceholder ? (
                 <div className="relative w-full h-40">
                    <Image
                        src={visionBoardPlaceholder.imageUrl}
                        alt={visionBoardPlaceholder.description}
                        fill
                        className="object-cover opacity-30"
                        data-ai-hint={visionBoardPlaceholder.imageHint}
                    />
                     <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-muted-foreground">
                        <ImagePlus className="h-8 w-8 mb-2" />
                        <p className="text-sm font-medium">Add images to your board</p>
                    </div>
                </div>
            ) :
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
              <ImagePlus className="h-8 w-8 mb-2" />
              <p className="text-sm font-medium">Add images to your board</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
