"use client";

import type { TimelineEvent } from "@/lib/types";
import { format } from "date-fns";

interface JourneyTimelineProps {
  events: TimelineEvent[];
}

export default function JourneyTimeline({ events }: JourneyTimelineProps) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20 py-12 text-center bg-card">
        <h3 className="text-lg font-semibold">Your Journey Awaits</h3>
        <p className="text-sm text-muted-foreground">Complete tasks and achieve goals to see your timeline unfold here.</p>
      </div>
    );
  }

  return (
    <div className="relative pl-8 before:absolute before:inset-y-0 before:w-px before:bg-border before:left-[19px] before:translate-x-[-0.5px]">
      {events.map((event) => (
        <div key={event.id} className="relative mb-10 last:mb-0">
          <div className="absolute top-1 -left-1.5 h-10 w-10 rounded-full bg-background flex items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center ring-4 ring-background">
              {event.icon}
            </div>
          </div>
          <div className="pl-12 pt-1.5">
            <p className="text-sm text-muted-foreground">{format(event.date, "MMMM d, yyyy")}</p>
            <h4 className="font-semibold mt-1 text-md text-foreground">{event.title}: <span className="font-normal">{event.description}</span></h4>
          </div>
        </div>
      ))}
    </div>
  );
}
