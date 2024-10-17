import { TextEffect } from "@/components/text-effect";
import { getI18n } from "@/locales/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getI18n();

  return (
    <div className="container mx-auto mt-4 px-2 pb-2 md:px-0">
      <h1 className="px-4 font-sans text-3xl font-bold">
        {t("events.allEvents", {
          evnts: (
            <TextEffect
              preset="blur"
              as="span"
              className="font-sofia ml-1 font-bold"
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
