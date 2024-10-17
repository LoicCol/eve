import GroupList from "./group-list";

export default function Groups({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return <GroupList locale={locale} />;
}
