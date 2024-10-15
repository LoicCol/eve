import { SignIn } from "@clerk/nextjs";
import { getI18n } from "@/locales/server";

export default async function Page() {
  const t = await getI18n();

  return (
    <div className="h-screen content-center">
      <h1>{t("signIn.title")}</h1>
      <SignIn />
    </div>
  );
}
