import { Skeleton } from "@/components/ui/skeleton";
import { ListTodo } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="ml-auto">
          <Skeleton className="h-10 w-28" />
        </div>
      </header>
      <main className="flex-1 space-y-8 p-4 sm:p-6 md:p-8">
        <div className="space-y-2">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-full" />
        </div>

        <div>
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold tracking-tight">
            <ListTodo className="text-primary" />
            <span>To-Do</span>
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-3 rounded-lg border bg-card p-4">
                <div className="flex items-start justify-between">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-6 w-6" />
                </div>
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
