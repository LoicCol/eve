"use server";

import { getGroup, getUser, getMembers } from "@/server/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import JoinButton from "./join-button";
import { currentUser } from "@clerk/nextjs/server";
import { Fragment } from "react";

export default async function GroupDetails({ groupId }: { groupId: string }) {
  const [group, members, currUser] = await Promise.all([
    getGroup(groupId),
    getMembers(groupId),
    currentUser(),
  ]);

  if (!group) {
    return <div>Not found</div>;
  }

  const user = await getUser(group.createdBy);
  const hasJoined = members.some((member) => member?.userId === currUser?.id);

  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{group.groupName}</h1>
        <JoinButton groupId={groupId} hasJoined={hasJoined} />
      </div>

      <div className="mt-6">
        {group.description ? (
          <p className="text-muted-foreground">{group.description}</p>
        ) : (
          <i className="text-muted-foreground">No description</i>
        )}
      </div>

      <div className="mt-4">
        <p className="pr-2 text-muted-foreground">Created by:</p>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <p className="text-foreground">{user?.name}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col">
        <p className="pr-2 text-muted-foreground">Members:</p>
        {members.map((member) => (
          <Avatar key={member?.userId}>
            <AvatarImage src={member?.image || ""} />
            <AvatarFallback>{member?.name.charAt(0)}</AvatarFallback>
          </Avatar>
        ))}
      </div>
    </Fragment>
  );
}
