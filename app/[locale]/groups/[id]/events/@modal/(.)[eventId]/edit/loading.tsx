import { Skeleton } from "@/components/ui/skeleton";
import { EVENT_FORM_HEIGHT } from "../../../event-form";

export default function Loading() {
  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <Skeleton className={`h-[${EVENT_FORM_HEIGHT}px] w-full rounded-md`} />
  );
}
