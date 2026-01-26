"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import type { VisionBoardItem } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface VisionBoardItemCardProps {
  item: VisionBoardItem;
  onDelete: (itemId: string) => void;
}

export default function VisionBoardItemCard({ item, onDelete }: VisionBoardItemCardProps) {
  return (
    <Card className="group relative aspect-square overflow-hidden">
      <Image
        src={item.imageUrl}
        alt={item.prompt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(item.id)}
          aria-label="Delete image"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
        {item.prompt}
      </p>
    </Card>
  );
}
