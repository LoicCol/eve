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
import { createGroup } from "@/lib/actions";
import { useRouter } from "next/navigation";

type FormData = {
  name: string;
};

export default function CreateGroupForm() {
  const router = useRouter();
  const form = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await createGroup(data);
      toast({
        title: "Group created",
        description: "Your new group has been successfully created.",
      });
      router.back();
      form.reset();
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: `There was a problem creating your group. ${error}.`,
        variant: "destructive",
      });
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
