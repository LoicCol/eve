import Modal from "@/components/modal";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Modal>{children}</Modal>;
}
