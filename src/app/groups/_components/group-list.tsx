"use server";

import { Table, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { getGroups } from "@/server/queries";
import Link from "next/link";

export default async function GroupList() {
  const groups = await getGroups();

  return (
    <div className="mt-8">
      {groups.length === 0 ? (
        <p className="text-muted-foreground">No groups found.</p>
      ) : (
        <Table className="min-w-full divide-y divide-gray-200">
          <TableBody>
            {groups.map((group) => (
              <Link
                href={`/groups/${group.groupId}`}
                key={group.groupId}
                legacyBehavior
              >
                <TableRow className="h-14 hover:text-primary cursor-pointer">
                  <TableCell>{group.groupName}</TableCell>
                  <TableCell className="text-right">
                    {group.createdAt.toLocaleDateString()}
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
