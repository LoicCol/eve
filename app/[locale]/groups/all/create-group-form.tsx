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
import { createGroup } from "@/lib/actions";
import { startTransition } from "react";
import React from "react";
import { useI18n } from "@/locales/client";

type FormData = {
  name: string;
};

export default function CreateGroupForm() {
  const t = useI18n();
  const form = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      startTransition(async () => {
        await createGroup(data);
      });
      toast.success(t("groups.createGroupSuccess"));
    } catch (error: unknown) {
      toast.error(`${t("groups.createGroupError")} ${error}.`);
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle>{t("groups.createNewGroup")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("groups.groupName")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("groups.enterGroupName")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{t("groups.createGroup")}</Button>
          </form>
        </Form>
      </CardContent>
    </>
  );
}
