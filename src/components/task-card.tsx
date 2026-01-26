"use client";

import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import {
  MoreVertical,
  Trash2,
  Edit,
  File,
  Film,
  Calendar,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Task, Priority, TaskFile } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";


interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}

const priorityStyles: Record<Priority, string> = {
  High: "bg-destructive/80 text-destructive-foreground hover:bg-destructive",
  Medium: "bg-accent text-accent-foreground hover:bg-accent/90",
  Low: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
};

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
}: TaskCardProps) {
  const videoThumbnail = PlaceHolderImages.find(img => img.id === 'video-thumbnail-1');

  const FileIcon = ({ file }: { file: TaskFile }) => {
    switch (file.type) {
      case "video":
        return <Film className="h-4 w-4 text-muted-foreground" />;
      default:
        return <File className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card
      className={cn(
        "flex flex-col transition-all duration-300",
        task.completed && "bg-card/50"
      )}
    >
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
        <Checkbox
          id={`task-${task.id}`}
          checked={task.completed}
          onCheckedChange={() => onToggleComplete(task.id)}
          className="mt-1 h-5 w-5"
          aria-label={`Mark task ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
        />
        <div className="flex-1">
          <CardTitle
            className={cn(
              "text-lg transition-all",
              task.completed && "text-muted-foreground line-through"
            )}
          >
            {task.title}
          </CardTitle>
          <CardDescription className="flex items-center gap-2 pt-1">
            <Calendar className="h-4 w-4" />
            <span>
              Due {formatDistanceToNow(task.dueDate, { addSuffix: true })}
            </span>
          </CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(task)}>
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(task.id)}
              className="text-destructive focus:bg-destructive/10 focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex-1 space-y-4 pt-0">
        <Badge className={cn(priorityStyles[task.priority])}>
          {task.priority} Priority
        </Badge>
        <p
          className={cn(
            "text-sm text-muted-foreground",
            task.completed && "line-through"
          )}
        >
          {task.description}
        </p>
      </CardContent>
      {task.files.length > 0 && (
        <CardFooter className="flex-col items-start gap-2">
            <Separator />
            <h4 className="text-sm font-medium">Attachments</h4>
            <div className="w-full space-y-2">
                {task.files.map(file => (
                    <div key={file.id} className="flex items-center gap-3">
                        {file.type === 'video' && videoThumbnail && (
                             <Image
                                src={videoThumbnail.imageUrl}
                                alt={videoThumbnail.description}
                                width={64}
                                height={40}
                                className="rounded-md object-cover"
                                data-ai-hint={videoThumbnail.imageHint}
                            />
                        )}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                            <FileIcon file={file} />
                            <a href={file.url} className="truncate" target="_blank" rel="noopener noreferrer">{file.name}</a>
                        </div>
                    </div>
                ))}
            </div>
        </CardFooter>
      )}
    </Card>
  );
}
