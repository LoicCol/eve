import { TextEffect } from "@/components/motioned/text-effect";
import { getI18n } from "@/locales/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getI18n();

  return (
    <div className="mx-auto size-full rounded-sm bg-background px-2 pb-2 md:px-14">
      <h1 className="mt-4 px-4 font-sans text-3xl font-bold">
        {t("events.allEvents", {
          evnts: (
            <TextEffect
              preset="blur"
              as="span"
              className="ml-1 font-sofia font-bold"
              per="word"
            >
              {t("eventsHeader.events")}
            </TextEffect>
          ),
        })}
      </h1>
      <div>{children}</div>
    </div>
  );
}
