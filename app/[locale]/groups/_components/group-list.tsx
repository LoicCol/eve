"use server";

import { Table, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { encode } from "@/util/shorten-uuid";
import Link from "next/link";
import GroupRowDropdown from "./group-row-dropdown";
import { getCurrentUserGroups } from "@/lib/actions";

export default async function GroupList() {
  const groups = await getCurrentUserGroups();

  return (
    <div className="mt-4 flex overflow-hidden rounded-lg border border-dashed">
      {groups.length === 0 ? (
        <p className="p-4 text-muted-foreground">No groups found.</p>
      ) : (
        <Table className="min-w-full divide-y divide-gray-200">
          <TableBody>
            {groups.map((group) => (
              <Link
                href={`/groups/${encode(group.groupId)}`}
                key={group.groupId}
                legacyBehavior
              >
                <TableRow className="relative h-14 cursor-pointer border-dashed hover:text-primary">
                  <TableCell>{group.groupName}</TableCell>
                  <TableCell className="text-right">
                    {group.createdAt.toLocaleDateString("en-UK", {
                      weekday: "long",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <GroupRowDropdown groupId={group.groupId} />
                  </TableCell>
                </TableRow>
              </Link>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
