"use server";

import { getGroup, getMembers } from "@/features/groups/server/groups.queries";
import { getUser } from "@/server/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import JoinButton from "./join-button";
import { currentUser } from "@clerk/nextjs/server";
import { Fragment } from "react";
import GroupDetailsName from "./group-details-name";
import { getI18n } from "@/locales/server";

export default async function GroupDetails({ groupId }: { groupId: string }) {
  const t = await getI18n();

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
      <div className="flex items-center justify-between gap-4">
        <GroupDetailsName {...group} />
        <JoinButton groupId={groupId} hasJoined={hasJoined} />
      </div>

      <div className="mt-6">
        <p className="pr-2 text-muted-foreground">
          {t("groupDetails.createdBy")}
        </p>
        <div className="flex items-center gap-2">
          <p className="text-foreground">{user?.name}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <p className="pr-2 text-muted-foreground">
          {t("groupDetails.members")}
        </p>
        {members.map((member) => (
          <div key={member?.userId} className="flex gap-2">
            <Avatar>
              <AvatarImage src={member?.image || ""} />
              <AvatarFallback>{member?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <p>{member?.name}</p>
          </div>
        ))}
      </div>
    </Fragment>
  );
}
