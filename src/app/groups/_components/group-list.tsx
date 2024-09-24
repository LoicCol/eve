"use server";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getGroups } from "@/server/queries";
import Link from "next/link";

export default async function GroupList() {
  const groups = await getGroups();

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Your Groups</h2>
      {groups.length === 0 ? (
        <p className="text-muted-foreground">No groups found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <Link href={`/groups/${group.groupId}`} key={group.groupId}>
              <Card key={group.groupId}>
                <CardHeader>
                  <CardTitle>{group.groupName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Created by: {group.createdBy}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
