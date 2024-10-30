import { useI18n } from "@/locales/client";

export default function EventsEmpty() {
    const t = useI18n();
    return (
      <p className="p-2 text-muted-foreground">
        {t("groupEvents.noEventsFound")}
      </p>
    );
  }
  