import { Fragment } from "react";
import { Form } from "@/components/ui/form";
import FormFieldText from "@/components/form/form-field-text";
import FormFieldDate from "@/components/form/form-field-date";
import FormFieldSelect from "@/components/form/form-field-select";
import { CreateEventFormFields, EditEventFormFields } from "types";
import { Path, UseFormReturn } from "react-hook-form";
import { useI18n } from "@/locales/client";

type EventFormFormField = CreateEventFormFields | EditEventFormFields;

interface EventFormProps<T extends EventFormFormField> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  submitButton: React.ReactNode;
  sections: { sectionId: string; sectionName: string }[];
}

export default function EventForm<T extends EventFormFormField>({
  form,
  onSubmit,
  sections,
  submitButton,
}: EventFormProps<T>) {
  const t = useI18n();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormFieldText
          control={form.control}
          name={"name" as Path<T>}
          label={t("eventForm.eventName")}
          placeholder={t("eventForm.enterEventName")}
        />
        <FormFieldText
          control={form.control}
          name={"location" as Path<T>}
          label={t("eventForm.location")}
          placeholder={t("eventForm.enterEventLocation")}
        />
        <FormFieldDate
          control={form.control}
          name={"startDate" as Path<T>}
          label={t("eventForm.dateAndTime")}
        />
        {/* <FormFieldTime
              control={form.control}
              name="startTime"
              label={t("eventForm.startTime")}
            /> */}
        <FormFieldSelect
          control={form.control}
          name={"sectionId" as Path<T>}
          placeholder={
            sections.length === 0
              ? t("eventForm.noSections")
              : t("eventForm.selectSectionPlaceholder")
          }
          label={
            <Fragment>
              {t("eventForm.selectSection")}
              <i>{t("eventForm.optional")}</i>
            </Fragment>
          }
          options={sections.map((section) => ({
            value: section.sectionId,
            label: section.sectionName,
          }))}
        />
        {submitButton}
      </form>
    </Form>
  );
}
