import CloseButton from "./close-button";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg">
        <CloseButton />
        {children}
      </div>
    </div>
  );
}
