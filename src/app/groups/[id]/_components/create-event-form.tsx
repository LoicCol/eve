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
import { toast } from "@/hooks/use-toast";
import { createEvent } from "@/lib/actions";
import { CreateEventFormFields, createEventFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { RotateCw } from "lucide-react";
import { decode } from "@/util/shorten-uuid";

export default function CreateEventForm() {
  const router = useRouter();
  const { id } = useParams();

  const form = useForm<CreateEventFormFields>({
    resolver: zodResolver(createEventFormSchema),
    defaultValues: {
      name: "",
      location: "",
      date: "",
      group: decode(id as string),
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createEvent,
  });

  const onSubmit = (data: CreateEventFormFields) => {
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "Event created",
          description: "Your new event has been successfully created.",
        });
        router.back();
        form.reset();
      },
      onError: (error: unknown) => {
        toast({
          title: "Error",
          description: `There was a problem creating your event. ${error}.`,
          variant: "destructive",
        });
        console.error(error);
      },
    });
  };

  return (
    <>
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
            <Button type="submit" disabled={isPending}>
              {isPending && <RotateCw className="mr-2 h-4 w-4 animate-spin" />}
              Create Event
            </Button>
          </form>
        </Form>
      </CardContent>
    </>
  );
}
