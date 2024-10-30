"use server";

import { getUser } from "@/server/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import JoinButton from "./join-button";
import { Fragment } from "react";
import GroupDetailsName from "./group-details-name";
import { getI18n } from "@/locales/server";

type Group = {
  createdBy: string;
  groupName: string;
  groupId: string;
};

type Member = {
  userId: string;
  name: string;
  image: string | null;
};

interface GroupDetailsProps {
  group: Group;
  members: Array<Member>;
  hasJoined: boolean;
}

export default async function GroupDetails({
  group,
  members,
  hasJoined,
}: GroupDetailsProps) {
  const t = await getI18n();

  const user = await getUser(group.createdBy);

  return (
    <Fragment>
      <div className="flex items-center justify-between gap-4">
        <GroupDetailsName {...group} />
      </div>

      <div className="mt-4">
        <JoinButton groupId={group.groupId} hasJoined={hasJoined} />
      </div>

      <div className="mt-4">
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
