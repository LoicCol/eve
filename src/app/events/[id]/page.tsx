import { getEvent, getParticipants, getUser } from "@/server/queries";
import EventDetails from "./event-details";

export default async function EventPage({
  params,
}: {
  params: { id: string };
}) {
  const event = await getEvent(params.id);

  if (!event) {
    return <p>Event not found</p>;
  }

  const user = await getUser(event.createdBy);
  const participants = (await getParticipants(params.id)).map(
    ({ user, status }) => ({ ...user, status })
  );

  return <EventDetails event={event} user={user} participants={participants} />;
}
