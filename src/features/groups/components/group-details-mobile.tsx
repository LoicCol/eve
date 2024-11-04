import GroupDetailsSidebarTrigger from "./group-details-sidebar-trigger";
import { Card, CardContent } from "@/components/ui/card";
import GroupDetailsSidebarContainer from "./group-details-sidebar-container";

export default async function GroupDetailsMobile({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GroupDetailsSidebarTrigger />
      <GroupDetailsSidebarContainer>
        <Card className="mt-2 h-auto w-full bg-card py-2">
          <CardContent>{children}</CardContent>
        </Card>
      </GroupDetailsSidebarContainer>
    </>
  );
}
