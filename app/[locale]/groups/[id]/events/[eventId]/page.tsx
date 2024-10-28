import {
  getEvent,
  getParticipants,
} from "@/features/events/server/queries/events";
import { getCurrentUser, getUser } from "@/features/users/server/queries/users";
import EventDetails from "@/features/events/components/event-details";
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
    getUser(event.createdBy ?? ""),
    getParticipants(eventUuid),
    getCurrentUser(),
  ]);

  const serializedParticipants = participants.map(({ user, status }) => ({
    ...user,
    status,
  }));

  return (
    <EventDetails
      event={event}
      user={user || undefined}
      creator={creator}
      participants={serializedParticipants}
    />
  );
}
