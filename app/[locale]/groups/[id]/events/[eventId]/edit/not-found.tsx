import { getI18n } from "@/locales/server";

export default async function NotFound() {
  const t = await getI18n();

  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">
          {t("eventDetails.notFound")}
        </h1>
      </div>
    </div>
  );
}
