"use client";

import { useI18n } from "@/locales/client";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { createEvent } from "server/actions/actions";
import { CreateEventFormFields } from "types";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { decode } from "@/util/shorten-uuid";
import { Fragment, startTransition } from "react";
import FormFieldText from "@/components/form/form-field-text";
import FormFieldDate from "@/components/form/form-field-date";
import FormFieldSelect from "@/components/form/form-field-select";
import FormSubmitButton from "@/components/form/form-submit-button";
// import FormFieldTime from "@/components/form/form-field-time";

interface CreateEventFormProps {
  sections: { sectionId: string; sectionName: string }[];
}

const useCreateEventForm = () => {
  const params = useParams();
  const id = params?.id as string | undefined;
  const t = useI18n();

  const form = useForm<CreateEventFormFields>({
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormFieldText
          control={form.control}
          name="name"
          label={t("createEventForm.eventName")}
          placeholder={t("createEventForm.enterEventName")}
        />
        <FormFieldText
          control={form.control}
          name="location"
          label={t("createEventForm.location")}
          placeholder={t("createEventForm.enterEventLocation")}
        />
        <FormFieldDate
          control={form.control}
          name="startDate"
          label={t("createEventForm.dateAndTime")}
        />
        {/* <FormFieldTime
          control={form.control}
          name="startTime"
          label={t("createEventForm.startTime")}
        /> */}
        <FormFieldSelect
          control={form.control}
          name="sectionId"
          placeholder={
            sections.length === 0
              ? t("createEventForm.noSections")
              : t("createEventForm.selectSectionPlaceholder")
          }
          label={
            <Fragment>
              {t("createEventForm.selectSection")}
              <i>{t("createEventForm.optional")}</i>
            </Fragment>
          }
          options={sections.map((section) => ({
            value: section.sectionId,
            label: section.sectionName,
          }))}
        />
        <FormSubmitButton isPending={isPending}>
          {t("createEventForm.createEvent")}
        </FormSubmitButton>
      </form>
    </Form>
  );
}
