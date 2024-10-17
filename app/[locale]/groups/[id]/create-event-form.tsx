"use client";

import { useI18n } from "@/locales/client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { createEvent } from "server/actions/actions";
import { CreateEventFormFields } from "types";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { decode } from "@/util/shorten-uuid";
import { Fragment, startTransition } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateEventFormProps {
  sections: { sectionId: string; sectionName: string }[];
}

export default function CreateEventForm({ sections }: CreateEventFormProps) {
  const params = useParams();
  const id = params?.id as string | undefined;
  const t = useI18n();

  const form = useForm<CreateEventFormFields>({
    defaultValues: {
      name: "",
      location: "",
      date: "",
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

  return (
    <Fragment>
      <CardHeader>
        <CardTitle>{t("createEventForm.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("createEventForm.eventName")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("createEventForm.enterEventName")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("createEventForm.location")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("createEventForm.enterEventLocation")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("createEventForm.dateAndTime")}</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sectionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("createEventForm.selectSection")}{" "}
                    <i>({t("createEventForm.optional")})</i>
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ?? undefined}
                      onValueChange={(value) => field.onChange(value)}
                      disabled={sections.length === 0}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            sections.length === 0
                              ? t("createEventForm.noSections")
                              : t("createEventForm.selectSectionPlaceholder")
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {sections.map((section) => (
                            <SelectItem
                              key={section.sectionId}
                              value={section.sectionId}
                            >
                              {section.sectionName}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              {t("createEventForm.createEvent")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Fragment>
  );
}
