"use client";

import EditableText from "@/src/components/editable-input";
import { editGroupName } from "@/src/lib/actions";
import { encode } from "@/src/util/shorten-uuid";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function GroupDetailsName({
  groupId,
  groupName,
}: {
  groupId: string;
  groupName: string;
}) {
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = useMutation({
    mutationFn: (data: { name: string }) => editGroupName(groupId, data.name),
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ["group", encode(groupId)],
      });
    },
  });

  const handleEditName = (newName: string) => {
    mutate({ name: newName });
  };

  return (
    <EditableText
      onSave={handleEditName}
      value={groupName}
      isPending={isPending}
    >
      <h1 className="text-xl font-bold">{variables?.name || groupName}</h1>
    </EditableText>
  );
}
