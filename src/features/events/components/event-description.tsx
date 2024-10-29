"use client";

import { editEvent } from "../server/events.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateEventFormFields } from "../types";
import { encode } from "@/util/shorten-uuid";
import EditableTextArea from "@/components/editable-text-area";

interface EventDescriptionProps {
  event: {
    eventId: string;
    eventName: string;
    location: string;
    startDate: Date;
    endDate: Date | null;
    description: string | null;
    groupId: string | null;
    sectionId: string | null;
  };
}

export default function EventDescription({ event }: EventDescriptionProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = useMutation({
    mutationFn: (data: Partial<CreateEventFormFields>) =>
      editEvent(event.eventId, {
        ...event,
        name: event.eventName,
        startDate: event.startDate.toISOString(),
        endDate: event.endDate.toISOString(),
        description: data.description || "",
      }),
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ["event", encode(event.eventId)],
      });
    },
  });

  const handleSaveDescription = (value: string) => {
    mutate({ description: value });
  };

  return (
    <div className="flex flex-1 pt-4 md:border-t-0 md:pl-4 md:pt-0">
      <EditableTextArea
        value={variables?.description || event.description || ""}
        isPending={isPending}
        onSave={handleSaveDescription}
      >
        <h2 className="text-xl font-semibold">Description</h2>
      </EditableTextArea>
    </div>
  );
}
