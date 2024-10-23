import { ReactElement } from "react";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

export default function FormSubmitButton({
  children,
  isPending,
}: {
  children: string | ReactElement;
  isPending?: boolean;
}) {
  return (
    <Button type="submit" disabled={isPending}>
      {isPending && <Loader className="mr-2 size-4 animate-spin" />}
      {children}
    </Button>
  );
}
