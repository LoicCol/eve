import { Fragment } from "react";
import { Form } from "@/components/ui/form";
import FormFieldText from "@/components/form/form-field-text";
import FormFieldDate from "@/components/form/form-field-date";
import FormFieldSelect from "@/components/form/form-field-select";
import { CreateEventFormFields, EditEventFormFields } from "types";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { useI18n } from "@/locales/client";
import FormFieldTime from "@/components/form/form-field-time";

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

interface UnresolvedEventFormProps extends EventFormProps {
  form: UseFormReturn<FieldValues>;
  onSubmit: (data: FieldValues) => void;
}

export default function EventForm<T extends EditEventFormProps>(
  props: T,
): React.ReactElement;

export default function EventForm<T extends CreateEventFormProps>(
  props: T,
): React.ReactElement;

export default function EventForm<T extends UnresolvedEventFormProps>({
  form,
  onSubmit,
  sections,
  submitButton,
}: T): React.ReactElement {
  const t = useI18n();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8"
      >
        <FormFieldText
          control={form.control}
          label={t("eventForm.eventName")}
          name="name"
          placeholder={t("eventForm.enterEventName")}
        />
        <FormFieldText
          control={form.control}
          label={t("eventForm.location")}
          name="location"
          placeholder={t("eventForm.enterEventLocation")}
        />
        <div className="grid grid-cols-2 gap-2">
          <FormFieldDate
            control={form.control}
            label={t("eventForm.startDate")}
            name="startDate"
            className=""
          />
          <FormFieldTime
            control={form.control}
            label={t("eventForm.startTime")}
            name="startTime"
            className=""
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FormFieldDate
            control={form.control}
            label={t("eventForm.endDate")}
            name="endDate"
            className=""
          />
          <FormFieldTime
            control={form.control}
            label={t("eventForm.endTime")}
            name="endTime"
            className=""
          />
        </div>
        <FormFieldSelect
          control={form.control}
          label={
            <Fragment>
              {t("eventForm.selectSection")}
              <i>{t("eventForm.optional")}</i>
            </Fragment>
          }
          name="sectionId"
          placeholder={
            sections.length === 0
              ? t("eventForm.noSections")
              : t("eventForm.selectSectionPlaceholder")
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

export const EVENT_FORM_HEIGHT = 536;
