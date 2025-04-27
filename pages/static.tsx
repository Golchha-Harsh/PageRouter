import { GetStaticProps } from "next";
import { User } from "@/types";
import { fetchUsers } from "@/lib";
import { Navbar, UserCard } from "@/components";
import { CONTAINER_CLASS, GRID_CLASSES} from "@/constants";
import { STATIC_PAGE_TITLE } from "@/constants/static";

export const getStaticProps: GetStaticProps<{ users: User[] }> = async () => {
  const users = await fetchUsers(); // fetch users once at build time
  return { props: { users } };
};

export default function StaticUsers({ users }: { users: User[] }) {
  return (
    <div className={CONTAINER_CLASS}>
      <Navbar />
      <h1 className="text-3xl font-bold my-6">{STATIC_PAGE_TITLE.USER_STATIC}</h1>
      <div className={GRID_CLASSES}>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
