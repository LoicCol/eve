import React from "react";
import EventsHeader from "../events-header";
import { getGroup } from "server/queries";
import { decode } from "@/util/shorten-uuid";
import { Separator } from "@/components/ui/separator";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const group = await getGroup(decode(params.id));
  return (
    <>
      <EventsHeader groupId={params.id} groupName={group?.groupName} />
      <Separator className="mb-4 mt-3 w-auto md:mx-2 md:mt-2" />
      {children}
    </>
  );
}
