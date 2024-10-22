import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
  return (
    <div className="mx-auto mt-8 w-full">
      <div className="mt-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex flex-col space-y-3">
              <Skeleton className="h-[78px] w-full rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
