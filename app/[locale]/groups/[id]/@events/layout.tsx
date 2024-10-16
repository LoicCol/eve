import React from "react";
import EventsHeader from "../_components/events-header";
import { getGroup } from "server/queries";
import { decode } from "util/shorten-uuid";

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
      {children}
    </>
  );
}
