// import { GetStaticPaths, GetStaticProps } from "next";
// import { User } from "@/types/user";
// import { USERS_API } from "@/constants/api";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import Navbar from "@/components/NavbarFix";
// //purpose: this page shows the details of a specific user using dynamic routing
// //users/1, /users/2 etc
// // it's statically pre-rendered at build time for known users, and also dynamically builds new pages on-demand (because of fallback: true)

// interface Props {
//   user: User | null;
// }
// //fetches all users drom api
// //reates dynamic route paths like: [{ params: { id: '1' } }, { params: { id: '2' } }, ...]
// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await fetch(USERS_API);
//   const users: User[] = await res.json();

//   const paths = users.map((user) => ({
//     params: { id: user.id.toString() },
//   }));

//   return {
//     paths,
//     fallback: true, //fallback: true enables on-demand generation of new pages at runtime for ids that is not in the initial list
//   };
// };

// export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
//   //It gets the id from the URL (params.id)
//   const id = params?.id;
//   // Fetches that specific user
//   const res = await fetch(`${USERS_API}/${id}`);
//   if (!res.ok) {
//     //If user not found, returns null (graceful error handling)
//     return { props: { user: null } };
//   }

//   const user: User = await res.json();

//   return {
//     props: { user },
//   };
// };

// export default function UserDetails({ user }: Props) {
//   const router = useRouter();
//   //To access router.isFallback and show loading while fallback page is being built
//   //dynamic page is still being generated this message shows up
//   if (router.isFallback) {
//     return (
//       <div className="max-w-3xl mx-auto px-4 text-center mt-16">
//         <Navbar />
//         <h1 className="text-2xl font-medium text-blue-500">Loading user data...</h1>
//       </div>
//     );
//   }
// //if user not found null
//   if (!user) {
//     return (
//       <div className="max-w-3xl mx-auto px-4 text-center mt-16">
//         <Navbar />
//         <h1 className="text-3xl font-bold text-red-500">User not found</h1>
//         <p className="text-gray-600 mt-2">The user you are looking for does not exist.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto px-4">
//       <Navbar />
//       <div className="text-center my-8">
//         <div className="relative w-32 h-32 mx-auto mb-4">
//           <Image
//             src={user.avatar}
//             alt={user.name}
//             fill
//             className="rounded-full object-cover"
//           />
//         </div>
//         <h1 className="text-3xl font-bold">{user.name}</h1>
//         <p className="text-lg text-gray-600">{user.email}</p>
//       </div>
//     </div>
//   );
// }

import { GetStaticPaths, GetStaticProps } from "next";
import { User } from "@/types/user";
import { USERS_API } from "@/constants/api";
import { fetchUserById } from "@/lib/api"; // New import
import Image from "next/image";
import { useRouter } from "next/router";
import Navbar from "@/components/NavbarFix";

interface Props {
  user: User | null;
}

// Generates dynamic routes for users: /users/1, /users/2, etc.
// getStaticPaths tells Next which dynamic routes to pre-render
// FETCHES ALL USERS FROM API AT THE TIME OF BUILD
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(USERS_API);
  const users: User[] = await res.json(); //ARRAY OF OBJECTS USER1 USER2 ....... USER10

  //PATH WILL HAVE THIS CONTENT[{ params: { id: "1" } },{ params: { id: "2" } },{ params: { id: "3" } ]

  const paths = users.map((user) => ({
    params: { id: user.id.toString() },
  }));

  // THIS TELLS Generate the listed paths at build time (/users/1, /users/2, etc.)
  // For other ids (e.g. /users/99), render on the first request (fallback mode)
  return {
    paths,
    fallback: true, //FALLBACK TRUE LOADING AND FALLBACK TRUE IT WILL CACHE AND NOT GOOD COMPARE TO LOADING FOR SEO CRAWLER
  };
};
//ALSO AS WE HAVE DONE FALLBACK TRUE SO IF WE HAVE 10 USER /11 WILL GIVE FALLBACK PAGE AND WHEN WE INCREASE 2 MORE USER AND WHEN WE CHANGE /11 TO /12 IT WILL DISPLAY USER BUT FOR /11 IT WILL STLL SHOW THAT CACHE PAGE AFTER BUILD

// Pre-renders each user detail page at build time
// getStaticProps fetches data needed for those pages
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = params?.id as string; //Grabs the user ID from the URL (e.g. params.id === '3')
  const user = await fetchUserById(id); // Fetches a single user by ID using a reusable helpeR

  return {
    props: { user }, //Passes the user (or null) as props to the page component
  };
};

export default function UserDetails({ user }: Props) {
  const router = useRouter();

  // Fallback page loading state
  if (router.isFallback) {
    return (
      <div className="max-w-3xl mx-auto px-4 text-center mt-16">
        <Navbar />
        <h1 className="text-2xl font-medium text-blue-500">
          Loading user data...
        </h1>
      </div>
    );
  }

  // If no user found
  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-4 text-center mt-16">
        <Navbar />
        <h1 className="text-3xl font-bold text-red-500">User not found</h1>
        <p className="text-gray-600 mt-2">
          The user you are looking for does not exist.
        </p>
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
