import { getI18n } from "@/locales/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getI18n();

  return (
    <div className="container mx-auto pb-2">
      <h1 className="px-4 text-3xl font-bold">{t("events.allEvents")}</h1>
      <div>{children}</div>
    </div>
  );
}
