import { SignUp } from "@clerk/nextjs";

export default async function Page() {
  return (
    <div className="content-center">
      <SignUp />
    </div>
  );
}
