import { GetStaticProps } from "next";
import { User } from "@/types/user";
import { USERS_API } from "@/constants/api";
import UserCard from "@/components/UserCard";
import Navbar from "@/components/NavbarFix";

interface Props {
  users: User[];
}
//this function is only executed once when we run build only
//used to pre-render page at build time with data already have
//In cache it stored and serves as static file 304
export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await fetch(USERS_API);
  const users = await res.json();
  return { props: { users } };
};

export default function StaticUsers({ users }: Props) {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <Navbar />
      <h1 className="text-3xl font-bold my-6">Users (Static Props)</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
