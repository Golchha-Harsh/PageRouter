import { GetStaticPaths, GetStaticProps } from "next";
import { User } from "@/types/user";
import { USERS_API } from "@/constants/api";
import Image from "next/image";
import { useRouter } from "next/router";
import Navbar from "@/components/NavbarFix";
//purpose: this page shows the details of a specific user using dynamic routing
//users/1, /users/2 etc
// it's statically pre-rendered at build time for known users, and also dynamically builds new pages on-demand (because of fallback: true)

interface Props {
  user: User | null;
}
//fetches all users drom api
//reates dynamic route paths like: [{ params: { id: '1' } }, { params: { id: '2' } }, ...]
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(USERS_API);
  const users: User[] = await res.json();

  const paths = users.map((user) => ({
    params: { id: user.id.toString() },
  }));

  return {
    paths,
    fallback: true, //fallback: true enables on-demand generation of new pages at runtime for ids that is not in the initial list
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  //It gets the id from the URL (params.id)
  const id = params?.id;
  // Fetches that specific user
  const res = await fetch(`${USERS_API}/${id}`);
  if (!res.ok) {
    //If user not found, returns null (graceful error handling)
    return { props: { user: null } };
  }

  const user: User = await res.json();

  return {
    props: { user },
  };
};

export default function UserDetails({ user }: Props) {
  const router = useRouter();
  //To access router.isFallback and show loading while fallback page is being built
  //dynamic page is still being generated this message shows up
  if (router.isFallback) {
    return (
      <div className="max-w-3xl mx-auto px-4 text-center mt-16">
        <Navbar />
        <h1 className="text-2xl font-medium text-blue-500">Loading user data...</h1>
      </div>
    );
  }
//if user not found null
  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-4 text-center mt-16">
        <Navbar />
        <h1 className="text-3xl font-bold text-red-500">User not found</h1>
        <p className="text-gray-600 mt-2">The user you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <Navbar />
      <div className="text-center my-8">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image
            src={user.avatar}
            alt={user.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="text-lg text-gray-600">{user.email}</p>
      </div>
    </div>
  );
}
