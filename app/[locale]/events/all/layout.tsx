import { TextEffect } from "@/components/motioned/text-effect";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getI18n } from "@/locales/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getI18n();

  return (
    <div className="mx-auto size-full overflow-auto bg-background px-2 pb-2 md:rounded-sm md:px-14">
      {/* Desktop */}
      <h1 className="mt-4 hidden px-4 font-sans text-3xl font-bold md:block">
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

      {/* Mobile */}
      <div className="flex items-center gap-2 p-2 py-4 md:hidden">
        <SidebarTrigger className="size-5" />
        <Separator orientation="vertical" className="mx-2 h-4" />
        <h1 className="font-sans text-2xl font-bold">
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
      </div>
      <div>{children}</div>
    </div>
  );
}
