import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-8">Groups</h1>
        <Button asChild>
          <Link href="/groups/all/create-group">Create Group</Link>
        </Button>
      </div>

      <div>{modal}</div>
      <div>{children}</div>
    </div>
  );
}