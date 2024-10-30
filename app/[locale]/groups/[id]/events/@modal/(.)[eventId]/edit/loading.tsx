import { Skeleton } from "@/components/ui/skeleton";
import { EVENT_FORM_HEIGHT } from "../../../../../../../../src/features/events/components/event-form";

export default function Loading() {
  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <Skeleton
      style={{
        height: EVENT_FORM_HEIGHT,
      }}
      className="w-full rounded-md"
    />
  );
}
