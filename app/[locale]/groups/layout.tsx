import Header from "@/features/header/components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col bg-background md:rounded-sm">
      <Header />

      <main
        className={`mx-auto flex size-full flex-1 justify-center overflow-auto`}
      >
        {children}
      </main>
    </div>
  );
}
