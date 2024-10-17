"use server";

import { encode } from "@/util/shorten-uuid";
import Link from "next/link";
import GroupRowDropdown from "./group-row-dropdown";
import { getCurrentUserGroups } from "server/actions/actions";
import { getI18n } from "@/locales/server";

export default async function GroupList({ locale }: { locale: string }) {
  const t = await getI18n();
  const groups = await getCurrentUserGroups();

  return (
    <div className="mt-6 flex overflow-hidden">
      {groups.length === 0 ? (
        <p className="p-4 text-muted-foreground">{t("groups.noGroupsFound")}</p>
      ) : (
        <ul className="w-full space-y-4 px-2 md:px-0">
          {groups.map((group) => (
            <li
              key={group.groupId}
              className="relative rounded-md border border-dashed border-primary/50 hover:bg-accent"
            >
              <Link
                href={`/groups/${encode(group.groupId)}`}
                className="flex cursor-pointer items-center justify-between py-1 pl-4 pr-2 hover:text-primary"
              >
                <span className="text-sm font-medium">{group.groupName}</span>
                <div className="flex items-center text-end">
                  <span className="mr-4 text-sm text-muted-foreground">
                    {new Date(group.createdAt).toLocaleDateString(locale, {
                      weekday: "long",
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
