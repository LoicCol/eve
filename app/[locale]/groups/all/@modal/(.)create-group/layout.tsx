import Modal from "@/components/modal";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Modal>{children}</Modal>;
}
