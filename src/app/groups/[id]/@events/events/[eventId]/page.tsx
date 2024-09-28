import { getEvent, getParticipants, getUser } from "@/server/queries";
import EventDetails from "./event-details";
import { decode } from "@/util/shorten-uuid";

export default async function EventPage({
  params,
}: {
  params: { eventId: string };
}) {
  const eventUuid = decode(params.eventId);
  const event = await getEvent(eventUuid);

  if (!event) {
    return <p>Event not found</p>;
  }

  const [user, participants] = await Promise.all([
    getUser(event.createdBy),
    getParticipants(eventUuid),
  ]);

  return (
    <EventDetails
      event={event}
      user={user}
      participants={participants.map(({ user, status }) => ({
        ...user,
        status,
      }))}
    />
  );
}
