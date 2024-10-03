import React from "react";
import EventsHeader from "../_components/events-header";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <>
      <EventsHeader groupId={params.id} />
      {children}
    </>
  );
}
