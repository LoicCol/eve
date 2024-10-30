import { Skeleton } from "@/components/ui/skeleton";

export default function EventsLoader({
  display,
}: {
  display: "grouped" | "sorted";
}) {
  return (
    <div className="space-y-8 pt-2 md:py-2">
      {display === "grouped" ? <Skeleton className="h-4 w-[80px]" /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-[166px] w-full rounded-xl" />
        <Skeleton className="h-[166px] w-full rounded-xl" />
      </div>
    </div>
  );
}
