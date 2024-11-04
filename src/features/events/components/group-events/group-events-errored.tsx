import { useI18n } from "@/locales/client";

export default function EventsErrored() {
  const t = useI18n();
  return (
    <p className="p-2 text-muted-foreground">
      {t("groupEvents.errorLoadingEvents")}
    </p>
  );
}
