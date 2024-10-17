import Link from "next/link";
import { getI18n } from "@/locales/server";
import { TextEffect } from "@/components/text-effect";
import { TrailedButton } from "@/components/trailed-button";
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
    <div className="container mx-auto flex flex-col rounded-lg md:py-4">
      <div className="flex justify-between gap-2">
        <h1 className="px-4 font-sans text-3xl font-bold">
          {t("groups.yourGroups", {
            groups: (
              <TextEffect
                preset="blur"
                as="span"
                className="font-sofia font-bold"
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

      <div className="flex flex-col overflow-hidden">{children}</div>
      {modal}
    </div>
  );
}
