import { GetServerSideProps } from "next";
import { User } from "@/types/user";
import { USERS_API } from "@/constants/api";
import UserCard from "@/components/UserCard";
import Navbar from "@/components/NavbarFix";

interface Props {
  users: User[];
}

// This runs on every request (Server-side Rendering)
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await fetch(USERS_API);
  const users = await res.json();
  return { props: { users } };
};

export default function ServerSideUsers({ users }: Props) {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <Navbar />
      <h1 className="text-3xl font-bold my-6">Users (Server Side)</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
