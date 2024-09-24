import EventDetails from "./event-details";

export default function EventPage({ params }: { params: { id: string } }) {
  return <EventDetails id={params.id} />;
}
