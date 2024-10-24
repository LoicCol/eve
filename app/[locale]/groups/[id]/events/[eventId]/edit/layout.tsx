import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Modal from "@/components/modal";
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
        <CardTitle>{t("editEventForm.title")}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Modal>
  );
}
