import { auth } from "@clerk/nextjs/server";
import {
  editGroup,
  insertGroup,
  insertUserGroup,
  removeUserGroup,
  deleteGroup as deleteGroupQuery,
  getUserGroups,
} from "./groups.queries";
import { getCurrentLocale } from "@/locales/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { encode } from "@/util/shorten-uuid";
import { CreateGroupFormFields, createGroupFormSchema } from "../types";
import { checkUserGroup } from "@/server/queries";

export async function createGroup(formData: CreateGroupFormFields) {
  const user = auth();
  if (!user.userId) {
    auth().protect();
    throw new Error("Unauthorized");
  }

  const validationResult = createGroupFormSchema.safeParse(formData);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { name } = validationResult.data;
  const locale = getCurrentLocale();

  const group = await insertGroup(name, user.userId);

  if (group?.groupId) {
    await insertUserGroup(user.userId, group.groupId);
  }

  revalidatePath(`/${locale}/groups/all`);
  redirect(`/${locale}/groups/${encode(group?.groupId || "")}/events`);
}

export async function joinGroup(groupId: string) {
  const user = auth();
  if (!user.userId) {
    auth().protect();
    throw new Error("Unauthorized");
  }

  const locale = getCurrentLocale();

  await insertUserGroup(user.userId, groupId);
  revalidatePath(`/${locale}/groups/${encode(groupId)}`);
}

export async function leaveGroup(groupId: string) {
  const user = auth();
  if (!user.userId) {
    auth().protect();
    throw new Error("Unauthorized");
  }

  const locale = getCurrentLocale();

  await removeUserGroup(user.userId, groupId);
  revalidatePath(`/${locale}/groups/${encode(groupId)}`);
}

export async function editGroupName(groupId: string, groupName: string) {
  const user = auth();
  if (!user.userId) {
    auth().protect();
    throw new Error("Unauthorized");
  }

  const locale = getCurrentLocale();

  await editGroup(groupId, {
    groupName,
  });

  revalidatePath(`/${locale}/groups/${groupId}`);
}

export async function editGroupDescription(
  groupId: string,
  description: string,
) {
  const user = auth();
  if (!user.userId) {
    auth().protect();
    throw new Error("Unauthorized");
  }

  const locale = getCurrentLocale();

  await editGroup(groupId, {
    description,
  });

  revalidatePath(`/${locale}/groups/${groupId}`);
}

export async function deleteGroup(groupId: string) {
  const user = auth();
  if (!user.userId) {
    auth().protect();
    throw new Error("Unauthorized");
  }

  const locale = getCurrentLocale();

  await deleteGroupQuery(groupId);

  revalidatePath(`/${locale}/groups`);
}

export async function getCurrentUserGroups() {
  const user = auth();
  if (!user.userId) {
    auth().protect();
    throw new Error("Unauthorized");
  }

  const groups = await getUserGroups(user.userId);

  return groups.filter((group) => group?.groupId);
}

export async function hasUserJoinedGroup() {
  const user = auth();
  if (!user.userId) {
    auth().protect();
    throw new Error("Unauthorized");
  }

  const isUserInGroup = await checkUserGroup(user.userId);

  return isUserInGroup;
}
