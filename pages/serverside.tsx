import { GetServerSideProps } from "next";
import { User } from "@/types/user";
import { fetchUsers } from "@/lib/api"; // Reused from lib/api
import UserCard from "@/components/UserCard";
import Navbar from "@/components/NavbarFix";
//ssr enabling fetch data on each req
interface Props {
  users: User[];
}
// This function runs on every request (Server-side Rendering)
// Used when data changes frequently or must be up-to-date at request time
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const users = await fetchUsers(); // call fetches users from api all uesrs latest users
  return { props: { users } };//returning up to date data
};
//this is react component for the /serverside it receives users from ssr function as props
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

