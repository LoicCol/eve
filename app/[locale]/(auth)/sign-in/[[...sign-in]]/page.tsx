import { SignIn } from "@clerk/nextjs";

export default async function Page() {
  return (
    <div className="content-center">
      <SignIn />
    </div>
  );
}
