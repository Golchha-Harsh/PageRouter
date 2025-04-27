import { GetServerSideProps } from "next";
import { User } from "@/types";
import { fetchUsers } from "@/lib";
import { Navbar, UserCard } from "@/components";
import { SERVER_SIDE_PAGE } from "@/constants";

interface Props {
  users: User[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const users = await fetchUsers(); // Fetch users on every request
  return { props: { users } };
};

export default function ServerSideUsers({ users }: Props) {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <Navbar />
      <h1 className="text-3xl font-bold my-6">{SERVER_SIDE_PAGE.USER_SERVER}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
