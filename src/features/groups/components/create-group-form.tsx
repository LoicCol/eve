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
import { createGroup } from "../server/groups.actions";
import { startTransition } from "react";
import React from "react";
import { useI18n } from "@/locales/client";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  name: z.string(),
});

export default function CreateGroupForm() {
  const t = useI18n();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof FormSchema>) => {
      return createGroup(data);
    },
    onSuccess: () => {
      toast.success(t("groups.createGroupSuccess"));
    },
    onError: (error: unknown) => {
      toast.error(`${t("groups.createGroupError")} ${error}.`);
      console.error(error);
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(() => {
      return mutate(data);
    });
  }

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
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader className="mr-2 size-4 animate-spin" />}
              {t("groups.createGroup")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </>
  );
}
