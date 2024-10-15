import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-screen content-center">
      <SignUp />
    </div>
  );
}
