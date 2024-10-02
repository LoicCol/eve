import {
  getCurrentUser,
  getEvent,
  getParticipants,
  getUser,
} from "@/server/queries";
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

  const [creator, participants, user] = await Promise.all([
    getUser(event.createdBy),
    getParticipants(eventUuid),
    getCurrentUser(),
  ]);

  return (
    <EventDetails
      event={event}
      user={user || undefined}
      creator={creator}
      participants={participants.map(({ user, status }) => ({
        ...user,
        status,
      }))}
    />
  );
}
