"use client";

import EditableTextarea from "@/components/editable-text-area";
import { editGroupDescription } from "@/lib/actions";
import { encode } from "@/util/shorten-uuid";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function GroupDetailsDescription({
  groupId,
  description,
}: {
  groupId: string;
  description: string | null;
}) {
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = useMutation({
    mutationFn: (data: { description: string }) =>
      editGroupDescription(groupId, data.description),
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ["group", encode(groupId)],
      });
    },
  });

  const handleEditDescription = (newDescription: string) => {
    mutate({ description: newDescription });
  };

  return (
    <EditableTextarea
      onSave={handleEditDescription}
      value={variables?.description || description || ""}
      isPending={isPending}
    >
      <h2 className="font-semibold text-muted-foreground">Description</h2>
    </EditableTextarea>
  );
}
