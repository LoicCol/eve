type Event = {
  sectionId: string | null;
  sectionName: string | null;
};

export function serializeSections(events: Event[]) {
  return events.reduce(
    (acc, event) => {
      if (!event.sectionId || !event.sectionName) return acc;

      if (!acc.some((section) => section.sectionId === event.sectionId)) {
        acc.push({
          sectionId: event.sectionId,
          sectionName: event.sectionName,
        });
      }
      return acc;
    },
    [] as { sectionId: string; sectionName: string }[],
  );
}
