import { GetStaticProps } from "next";
import { User } from "@/types/user";
import { fetchUsers } from "@/lib/api"; // imported from lib/api
import UserCard from "@/components/UserCard";
import Navbar from "@/components/NavbarFix";

interface Props {
  users: User[];
}

// this function is only executed once when we run build only
// used to pre-render page at build time with data already have
// In cache it stored and serves as full static html file 304
export const getStaticProps: GetStaticProps<Props> = async () => {
  const users = await fetchUsers(); // it fetches my user data and we will send it as props pages served from cdn
  return { 
    props: { users }, 
    // revalidate: 10 //ISR
};
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
//When you add new users to the API we need to rebuild the site to see them unless you use ISR
