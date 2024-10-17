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
      <Separator className="mx-2 mb-4 mt-2 w-auto" />
      {children}
    </>
  );
}
