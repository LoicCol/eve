import { SignUp } from "@clerk/nextjs";
import { getI18n } from "@/locales/server";

export default async function Page() {
  const t = await getI18n();

  return (
    <div className="h-screen content-center">
      <h1>{t("signUp.title")}</h1>
      <SignUp />
    </div>
  );
}
