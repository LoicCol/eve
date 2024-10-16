import { SignUp } from "@clerk/nextjs";

export default async function Page() {
  return (
    <div className="h-screen content-center">
      <SignUp />
    </div>
  );
}
