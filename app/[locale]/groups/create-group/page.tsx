import CreateGroupForm from "../all/create-group-form";
import CloseButton from "./close-button";

export default function Page() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg">
        <CloseButton />
        <CreateGroupForm />
      </div>
    </div>
  );
}
