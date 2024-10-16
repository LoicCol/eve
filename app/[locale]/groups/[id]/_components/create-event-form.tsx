"use client";

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
import { createEvent } from "@/lib/actions";
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

  const form = useForm<CreateEventFormFields>({
    defaultValues: {
      name: "",
      location: "",
      date: "",
      group: decode(id as string),
      description: "",
      sectionId: "", // Add sectionId to default values
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      toast.success("Your new event has been successfully created.");
    },
    onError: (error: unknown) => {
      toast.error(`There was a problem creating your event. ${error}.`);
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
        <CardTitle>Create New Event</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event name" {...field} />
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
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event location" {...field} />
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
                  <FormLabel>Date and Time</FormLabel>
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
                    Select Section <i>(Optional)</i>
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ?? undefined}
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
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Create Event
            </Button>
          </form>
        </Form>
      </CardContent>
    </Fragment>
  );
}