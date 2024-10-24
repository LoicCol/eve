import Modal from "@/components/modal";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getI18n } from "@/locales/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getI18n();

  return (
    <Modal>
      <CardHeader>
        <CardTitle>{t("createEventForm.title")}</CardTitle>
      </CardHeader>
      <CardContent className="overflow-auto">{children}</CardContent>
    </Modal>
  );
}
