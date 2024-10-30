import Header from "@/features/header/components/header";
import GroupDetailsSidebarProvider from "@/util/group-details-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GroupDetailsSidebarProvider>
      <div className="flex h-full flex-col overflow-hidden bg-background md:rounded-sm">
        <Header />

        <main
          className={`mx-auto flex size-full flex-1 justify-center overflow-auto`}
        >
          {children}
        </main>
      </div>
    </GroupDetailsSidebarProvider>
  );
}
