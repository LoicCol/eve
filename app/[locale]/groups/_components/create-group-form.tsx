"use client";

import { useForm } from "react-hook-form";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { CardHeader, CardTitle, CardContent } from "components/ui/card";
import { toast } from "sonner";
import { createGroup } from "lib/actions";
import { startTransition } from "react";
import React from "react";

type FormData = {
  name: string;
};

export default function CreateGroupForm() {
  const form = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      startTransition(async () => {
        await createGroup(data);
      });
      toast.success("Your new group has been successfully created.");
    } catch (error: unknown) {
      toast.error(`There was a problem creating your group. ${error}.`);
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Create New Group</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter group name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create Group</Button>
          </form>
        </Form>
      </CardContent>
    </>
  );
}
