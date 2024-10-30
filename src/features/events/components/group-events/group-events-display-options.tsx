import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useI18n } from "@/locales/client";

export function MomentFilter({
  value,
  onValueChange,
}: {
  value: "upcoming" | "past";
  onValueChange: (value: "upcoming" | "past") => void;
}) {
  const t = useI18n();

  return (
    <ToggleGroup
      type="single"
      variant="default"
      value={value}
      onValueChange={onValueChange}
      className="justify-start gap-2"
    >
      <ToggleGroupItem
        value="upcoming"
        className="h-auto rounded-[.375rem] bg-card-foreground/5 p-1 px-2 text-sm font-medium text-muted-foreground/80 data-[state=on]:bg-primary/10 data-[state=on]:text-primary data-[state=on]:shadow-sm"
        aria-label="Toggle upcoming"
      >
        {t("groupEvents.upcoming")}
      </ToggleGroupItem>
      <ToggleGroupItem
        value="past"
        className="h-auto rounded-[.375rem] bg-card-foreground/5 p-1 px-2 text-sm font-medium text-muted-foreground/80 data-[state=on]:bg-primary/10 data-[state=on]:text-primary data-[state=on]:shadow-sm"
        aria-label="Toggle past"
      >
        {t("groupEvents.past")}
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export function DisplayToggle({
  value,
  onValueChange,
}: {
  value: "grouped" | "sorted";
  onValueChange: (value: "grouped" | "sorted") => void;
}) {
  const t = useI18n();

  return (
    <ToggleGroup
      type="single"
      variant="default"
      value={value}
      onValueChange={onValueChange}
      className="justify-start gap-2"
    >
      <ToggleGroupItem
        value="grouped"
        className="h-auto rounded-[.375rem] bg-card-foreground/5 p-1 px-2 text-sm font-medium text-muted-foreground/80 data-[state=on]:bg-primary/10 data-[state=on]:text-primary data-[state=on]:shadow-sm"
        aria-label="Toggle upcoming"
      >
        {t("groupEvents.grouped")}
      </ToggleGroupItem>
      <ToggleGroupItem
        value="sorted"
        className="h-auto rounded-[.375rem] bg-card-foreground/5 p-1 px-2 text-sm font-medium text-muted-foreground/80 data-[state=on]:bg-primary/10 data-[state=on]:text-primary data-[state=on]:shadow-sm"
        aria-label="Toggle past"
      >
        {t("groupEvents.sorted")}
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
