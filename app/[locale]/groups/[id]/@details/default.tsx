import { decode } from "@/util/shorten-uuid";
import GroupDetails from "../../../../../src/features/groups/components/group-details";
import { getGroup } from "@/features/groups/server/groups.queries";
import { currentUser } from "@clerk/nextjs/server";
import { getMembers } from "@/features/groups/server/groups.queries";
import JoinModal from "@/features/groups/components/join-modal";

export default async function Default({ params }: { params: { id: string } }) {
  const groupId = decode(params.id);

  const [group, members, currUser] = await Promise.all([
    getGroup(groupId),
    getMembers(groupId),
    currentUser(),
  ]);

  if (!group) {
    return <div>Not found</div>;
  }

  const serializedMembers = members.map((member) => ({
    userId: member.userId,
    name: member.name,
    image: member.image,
  }));

  const hasJoined = members.some((member) => member?.userId === currUser?.id);

  return (
    <>
      <GroupDetails
        group={group}
        members={serializedMembers}
        hasJoined={hasJoined}
      />
      <JoinModal groupId={groupId} hasJoined={hasJoined} />
    </>
  );
}
