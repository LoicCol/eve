import Link from "next/link";
import { getI18n } from "@/locales/server";
import { TextEffect } from "@/components/motioned/text-effect";
import { TrailedButton } from "@/components/motioned/trailed-button";
import { Separator } from "@/components/ui/separator";

export default async function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const t = await getI18n();

  return (
    <div className="mx-auto w-full p-2 md:px-14 md:py-8">
      <div className="flex justify-between gap-2 px-2 md:px-0">
        <h1 className="px-4 font-sans text-2xl font-bold md:text-3xl">
          {t("groups.yourGroups", {
            groups: (
              <TextEffect
                preset="blur"
                as="span"
                className="ml-1 font-sofia font-bold"
                per="word"
              >
                {t("header.groups")}
              </TextEffect>
            ),
          })}
        </h1>
        <TrailedButton asChild>
          <Link href="/groups/all/create-group">{t("groups.createGroup")}</Link>
        </TrailedButton>
      </div>

      <Separator className="mx-4 mt-6 w-auto" />

      <div className="flex flex-col overflow-hidden pb-8">{children}</div>
      {modal}
    </div>
  );
}
