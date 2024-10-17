import { getI18n } from "@/locales/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default async function Home() {
  const t = await getI18n();

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 px-4 font-sans text-3xl font-bold">
        {t("home.title")}
        <span className="font-sofia font-sbold ml-4 text-6xl text-primary">
          Eve
        </span>
      </h1>
      <p className="mb-16 px-4 font-sans text-lg text-foreground">
        {t("home.description")}
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-sans">
              {t("home.upcomingEvents.title")}
            </CardTitle>
            <CardDescription>
              {t("home.upcomingEvents.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{t("home.upcomingEvents.content")}</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/events/all">{t("home.upcomingEvents.button")}</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-sans">
              {t("home.yourGroups.title")}
            </CardTitle>
            <CardDescription>
              {t("home.yourGroups.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{t("home.yourGroups.content")}</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/groups/all">{t("home.yourGroups.button")}</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
