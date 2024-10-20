import CloseButton from "./close-button";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string; id: string };
}) {
  const { locale, id } = params;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg">
        <CloseButton groupId={id} locale={locale} />

        {children}
      </div>
    </div>
  );
}
