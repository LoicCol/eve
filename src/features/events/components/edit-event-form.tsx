"use client";

import { useI18n } from "@/locales/client";
import { useMutation } from "@tanstack/react-query";
import { startTransition } from "react";
import { useForm } from "react-hook-form";
import { editEvent } from "server/actions/actions";
import { toast } from "sonner";
import { EditEventFormFields } from "types";
import EventForm from "../../../../../../../src/features/events/components/event-form";
import { useParams } from "next/navigation";
import FormSubmitButton from "@/components/form/form-submit-button";
import { decode } from "@/util/shorten-uuid";

type Event = {
  name: string;
  location: string;
  startDate: string;
  description: string | null;
  sectionId: string | null;
};

const useEditEventForm = ({ event }: { event: Event }) => {
  const t = useI18n();
  const { eventId } = useParams();

  const form = useForm<EditEventFormFields>({
    defaultValues: event,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: EditEventFormFields) =>
      editEvent(decode(eventId as string), data),
    onSuccess: () => {
      toast.success(t("editEventForm.successMessage"));
    },
    onError: (error: unknown) => {
      toast.error(t("editEventForm.errorMessage", { error: String(error) }));
      console.error(error);
    },
  });

  const onSubmit = (data: EditEventFormFields) => {
    startTransition(() => {
      return mutate(data);
    });
  };

  return {
    form,
    onSubmit,
    isPending,
    t,
  };
};

interface EditEventFormProps {
  sections: { sectionId: string; sectionName: string }[];
  event: Event;
}

export default function EditEventForm({ event, sections }: EditEventFormProps) {
  const { form, onSubmit, isPending, t } = useEditEventForm({ event });

  return (
    <EventForm
      form={form}
      onSubmit={onSubmit}
      sections={sections}
      initialData={event}
      submitButton={
        <FormSubmitButton isPending={isPending}>
          {t("editEventForm.editEvent")}
        </FormSubmitButton>
      }
    />
  );
}
