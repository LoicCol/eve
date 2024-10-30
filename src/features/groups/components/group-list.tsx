"use server";

import { encode } from "@/util/shorten-uuid";
import Link from "next/link";
import GroupRowDropdown from "./group-row-dropdown";
import { getCurrentUserGroups } from "../server/groups.actions";
import { getI18n } from "@/locales/server";

export default async function GroupList({ locale }: { locale: string }) {
  const t = await getI18n();
  const groups = await getCurrentUserGroups();

  return (
    <div className="mt-6 overflow-hidden">
      {groups.length === 0 ? (
        <p className="p-4 text-muted-foreground">{t("groups.noGroupsFound")}</p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 px-2 sm:grid-cols-2 md:px-0 lg:grid-cols-3">
          {groups.map((group) => (
            <li
              key={group.groupId}
              className="relative rounded-md border border-dashed border-primary/50 hover:bg-accent"
            >
              <Link
                href={`/groups/${encode(group.groupId)}/events`}
                className="flex h-full cursor-pointer flex-col p-4 hover:text-primary"
              >
                <span className="mb-2 text-sm font-medium">
                  {group.groupName}
                </span>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {new Date(group.createdAt).toLocaleDateString(locale, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <GroupRowDropdown groupId={group.groupId} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
