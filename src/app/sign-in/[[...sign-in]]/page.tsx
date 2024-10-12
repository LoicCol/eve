import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-screen content-center">
      <SignIn />
    </div>
  );
}
