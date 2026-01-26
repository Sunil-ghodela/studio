"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card } from "./ui/card";

export function MapPlaceholder() {
    const mapImage = PlaceHolderImages.find(img => img.id === 'map-placeholder-1');

    if (!mapImage) {
        return (
            <Card className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                Map not available
            </Card>
        );
    }

    return (
        <Card className="aspect-video w-full relative rounded-lg overflow-hidden border">
            <Image
                src={mapImage.imageUrl}
                alt={mapImage.description}
                fill
                className="object-cover"
                data-ai-hint={mapImage.imageHint}
            />
        </Card>
    )
}
