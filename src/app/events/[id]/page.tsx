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

  const [user, participants] = await Promise.all([
    getUser(event.createdBy),
    getParticipants(params.id),
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
