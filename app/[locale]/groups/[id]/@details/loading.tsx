import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="size-full pt-2">
      <Skeleton className="size-full" />
    </div>
  );
}
