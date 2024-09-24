import GroupList from "./group-list";
import CreateGroupForm from "./create-group-form";

export default function Groups() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Groups</h1>
      <CreateGroupForm />
      <GroupList />
    </div>
  );
}
