import { getI18n } from "@/locales/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getI18n();

  return (
    <div className="container mx-auto mt-4 pb-2">
      <h1 className="px-4 font-sans text-3xl font-bold">
        {t("events.allEvents", {
          evnts: (
            <span className="font-sofia ml-2 hover:text-primary">
              {t("eventsHeader.events")}
            </span>
          ),
        })}
      </h1>
      <div>{children}</div>
    </div>
  );
}
