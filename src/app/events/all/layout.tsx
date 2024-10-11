export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto pb-2">
      <h1 className="px-4 text-3xl font-bold">All Events</h1>
      <div>{children}</div>
    </div>
  );
}
