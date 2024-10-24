import { Fragment } from "react";
import { Form } from "@/components/ui/form";
import FormFieldText from "@/components/form/form-field-text";
import FormFieldDate from "@/components/form/form-field-date";
import FormFieldSelect from "@/components/form/form-field-select";
import { CreateEventFormFields, EditEventFormFields } from "types";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { useI18n } from "@/locales/client";

interface EventFormProps {
  submitButton: React.ReactNode;
  sections: { sectionId: string; sectionName: string }[];
}

interface EditEventFormProps extends EventFormProps {
  form: UseFormReturn<EditEventFormFields>;
  onSubmit: (data: EditEventFormFields) => void;
}

interface CreateEventFormProps extends EventFormProps {
  form: UseFormReturn<CreateEventFormFields>;
  onSubmit: (data: CreateEventFormFields) => void;
}

export default function EventForm<T extends EditEventFormProps>(
  props: T,
): React.ReactElement;

export default function EventForm<T extends CreateEventFormProps>(
  props: T,
): React.ReactElement;

export default function EventForm<T extends FieldValues & EventFormProps>({
  form,
  onSubmit,
  sections,
  submitButton,
}: T): React.ReactElement {
  const t = useI18n();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormFieldText
          control={form.control}
          name="name"
          label={t("eventForm.eventName")}
          placeholder={t("eventForm.enterEventName")}
        />
        <FormFieldText
          control={form.control}
          name="location"
          label={t("eventForm.location")}
          placeholder={t("eventForm.enterEventLocation")}
        />
        <FormFieldDate
          control={form.control}
          name="startDate"
          label={t("eventForm.dateAndTime")}
        />
        {/* <FormFieldTime
              control={form.control}
              name="startTime"
              label={t("eventForm.startTime")}
            /> */}
        <FormFieldSelect
          control={form.control}
          name="sectionId"
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
