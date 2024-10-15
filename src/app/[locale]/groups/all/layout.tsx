import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getI18n } from "@/locales/server";

export default async function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const t = await getI18n();

  return (
    <div className="container mx-auto flex flex-col rounded-lg px-4 shadow-sm md:border md:py-4">
      <div className="flex justify-between gap-2">
        <h1 className="text-2xl font-bold">{t("groups.yourGroups")}</h1>
        <Button asChild>
          <Link href="/groups/all/create-group">{t("groups.createGroup")}</Link>
        </Button>
      </div>

      <div className="flex flex-col overflow-hidden">{children}</div>
      {modal}
    </div>
  );
}
