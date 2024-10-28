import { SignIn } from "@clerk/nextjs";

export default async function Page() {
  return (
    <div className="flex size-full items-center justify-center">
      <SignIn />
    </div>
  );
}
