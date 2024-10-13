"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { linkEventsToSection } from "@/lib/actions";
import { startTransition, useMemo } from "react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  name: z.string().optional(),
  sectionId: z.string().optional(),
});

interface LinkEventsProps {
  events: {
    eventId: string;
    eventName: string;
    sectionName: string;
    sectionId: string;
  }[];
}

export default function LinkEvents({ events }: LinkEventsProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
      name: "",
      sectionId: "",
    },
  });

  const sections = useMemo(() => {
    return events.reduce(
      (acc, event) => {
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
  }, [events]);

  const { mutate } = useMutation({
    mutationFn: (data: z.infer<typeof FormSchema>) => {
      return linkEventsToSection(data.items, data.name, data.sectionId);
    },
    onSuccess: () => {
      toast.success("Your events have been successfully linked.");
      router.back();
    },
    onError: (error: unknown) => {
      toast.error(`There was a problem linking your events. ${error}.`);
      console.error(error);
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(() => {
      return mutate(data);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Link Events</FormLabel>
                <FormDescription>
                  Select the events you want to link.
                </FormDescription>
              </div>
              {events.map((event) => (
                <FormField
                  key={event.eventId}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={event.eventId}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(event.eventId)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([
                                    ...field.value,
                                    event.eventId,
                                  ])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== event.eventId,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {event.eventName}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sectionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Existing Section</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a section" />
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Create New Section</FormLabel>
              <FormControl>
                <Input type="text" {...field} placeholder="New section name" />
              </FormControl>
              <FormDescription>
                Leave empty if you want to link to an existing section.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
