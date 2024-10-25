"use client";

import { useI18n } from "@/locales/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createEvent } from "server/actions/actions";
import { CreateEventFormFields, createEventFormSchema } from "types";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { decode } from "@/util/shorten-uuid";
import { startTransition } from "react";
import EventForm from "../event-form";
import FormSubmitButton from "@/components/form/form-submit-button";
import { zodResolver } from "@hookform/resolvers/zod";

interface CreateEventFormProps {
  sections: { sectionId: string; sectionName: string }[];
}

const useCreateEventForm = () => {
  const params = useParams();
  const id = params?.id as string | undefined;
  const t = useI18n();

  const form = useForm<CreateEventFormFields>({
    resolver: zodResolver(createEventFormSchema),
    defaultValues: {
      name: "",
      location: "",
      startDate: "",
      group: decode(id as string),
      description: "",
      sectionId: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      toast.success(t("createEventForm.successMessage"));
    },
    onError: (error: unknown) => {
      toast.error(t("createEventForm.errorMessage", { error: String(error) }));
      console.error(error);
    },
  });

  const onSubmit = (data: CreateEventFormFields) => {
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

export default function CreateEventForm({ sections }: CreateEventFormProps) {
  const { form, onSubmit, isPending, t } = useCreateEventForm();

  return (
    <EventForm
      form={form}
      onSubmit={onSubmit}
      submitButton={
        <FormSubmitButton isPending={isPending}>
          {t("createEventForm.createEvent")}
        </FormSubmitButton>
      }
      sections={sections}
    />
  );
}
