import { useI18n } from "@/locales/client";
import { useMutation } from "@tanstack/react-query";
import { startTransition } from "react";
import { useForm } from "react-hook-form";
import { editEvent } from "server/actions/actions";
import { toast } from "sonner";
import { EditEventFormFields } from "types";
import EventForm from "../event-form";
import { useParams } from "next/navigation";
import FormSubmitButton from "@/components/form/form-submit-button";

const useEditEventForm = () => {
  const t = useI18n();
  const { eventId } = useParams();

  const form = useForm<EditEventFormFields>({
    defaultValues: {
      name: "",
      location: "",
      startDate: "",
      description: "",
      sectionId: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: EditEventFormFields) =>
      editEvent(eventId as string, data),
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
}

export default function EditEventForm({ sections }: EditEventFormProps) {
  const { form, onSubmit, isPending, t } = useEditEventForm();
  return (
    <EventForm
      form={form}
      onSubmit={onSubmit}
      sections={sections}
      submitButton={
        <FormSubmitButton isPending={isPending}>
          {t("editEventForm.editEvent")}
        </FormSubmitButton>
      }
    />
  );
}
