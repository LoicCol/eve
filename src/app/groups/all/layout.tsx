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
    <div className="container mx-auto flex flex-col rounded-lg px-4 shadow md:border md:py-4">
      <div className="flex justify-between gap-2">
        <h1 className="text-2xl font-bold">{"Groups you are in"}</h1>
        <Button asChild>
          <Link href="/groups/all/create-group">Create Group</Link>
        </Button>
      </div>

      <div className="flex flex-col overflow-hidden">{children}</div>
      {modal}
    </div>
  );
}
