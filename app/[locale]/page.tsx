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
import { TextEffect } from "@/components/text-effect";
import { hasUserJoinedGroup } from "server/actions/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Smile } from "lucide-react";
import { TrailedButton } from "@/components/trailed-button";

export default async function Home() {
  const t = await getI18n();
  const hasUserJoinedAGroup = await hasUserJoinedGroup();

  return (
    <div className="mx-auto w-full overflow-auto px-2 py-8 md:overflow-visible md:px-10">
      <h1 className="mb-8 px-4 font-sans text-3xl font-bold">
        {t("home.title")}
        <TextEffect
          preset="blur"
          as="span"
          className="ml-4 font-sofia text-6xl text-primary"
          per="word"
          delay={0.2}
        >
          Eve
        </TextEffect>
      </h1>
      <p className="mb-14 px-4 font-sans text-lg text-foreground">
        {t("home.description")}
      </p>
      {!hasUserJoinedAGroup ? (
        <Alert
          variant="default"
          className="mb-8 flex animate-bounce items-center justify-between gap-2 border-primary/80 bg-primary/10 text-primary/80 duration-1000"
        >
          <div className="flex items-center gap-2">
            <Smile className="mr-4 h-5 w-5" />
            <div>
              <AlertTitle className="text-lg font-bold">
                Everything start with a group!
              </AlertTitle>
              <AlertDescription>
                You will be able to manage your events and invite your friends.
              </AlertDescription>
            </div>
          </div>
          <TrailedButton>
            <Link href="/groups/all/create-group">
              {t("groups.createGroup")}
            </Link>
          </TrailedButton>
        </Alert>
      ) : null}
      <div className="grid grid-cols-1 gap-6 px-0 md:grid-cols-2 md:px-0">
        <Card className="rounded-none border-primary/50 transition-all duration-300 ease-in-out hover:translate-y-[-3px] hover:rounded-none hover:shadow-lg active:translate-x-[0px] active:translate-y-[0px] active:rounded-xl active:shadow-none md:rounded-md">
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
        <Card className="rounded-none border-primary/50 transition-all duration-300 ease-in-out hover:translate-y-[-3px] hover:rounded-none hover:shadow-lg active:translate-x-[0px] active:translate-y-[0px] active:rounded-xl active:shadow-none md:rounded-md">
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
      </div>
    </div>
  );
}
