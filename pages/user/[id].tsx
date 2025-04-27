// import { GetStaticPaths, GetStaticProps } from "next";
// import { fetchUserById, fetchUsers } from "@/lib";
// import { User } from "@/types";
// import { Navbar } from "@/components";
// import Image from "next/image";
// import {
//   USER_CARD_CONTAINER,
//   USER_CARD_IMAGE,
//   CONTAINER,
//   HEADING,
//   TEXT_MUTED,
// } from "@/constants/classNames";

// // =========== Interface for Props ===========
// interface Props {
//   user: User;
// }

// // =========== Next.js Static Functions ===========
// export const getStaticPaths: GetStaticPaths = async () => {
//   const users = await fetchUsers();
//   const paths = users.map((user) => ({
//     params: { id: user.id.toString() },
//   }));
//   //console.log(paths)
//   return { paths, fallback: "blocking" };
// };

// export const getStaticProps: GetStaticProps<{ user: User | null }> = async ({
//   params,
// }) => {
//   const id = params?.id as string;
//   const user = await fetchUserById(id);
//   if (!user) return { notFound: true };
//   return { props: { user }, revalidate: 60 };
// };

// // =========== Component ===========
// export default function UserPage({ user }: Props) {
//   return (
//     <div className={CONTAINER}>
//       <Navbar />
//       <h1 className={HEADING}>User Detail</h1>
//       <div className="flex justify-center">
//         <div className={USER_CARD_CONTAINER}>
//           <div className="relative w-32 h-32 mb-4 mx-auto">
//             <Image
//               src={user.avatar}
//               alt={user.name}
//               fill
//               className={USER_CARD_IMAGE}
//             />
//           </div>
//           <h2 className="text-xl font-semibold text-center">{user.name}</h2>
//           <p className={`text-center ${TEXT_MUTED}`}>{user.email}</p>
//         </div>
//       </div>
//     </div>
//   );
// }
// import { GetStaticPaths, GetStaticProps } from "next";
// import { fetchUserById, fetchUsers } from "@/lib";
// import { User } from "@/types";
// import { Navbar } from "@/components";
// import Image from "next/image";
// import {
//   USER_CARD_CONTAINER,
//   USER_CARD_IMAGE,
//   CONTAINER,
//   HEADING,
//   USER_CARD_WRAPPER,
//   USER_IMAGE_WRAPPER,
//   USER_NAME_STYLE,
//   USER_EMAIL_STYLE,
// } from "@/constants/classNames"; // Updated imports

// // =========== Interface for Props ===========
// interface Props {
//   user: User;
// }

// // =========== Next.js Static Functions ===========
// export const getStaticPaths: GetStaticPaths = async () => {
//   const users = await fetchUsers();
//   const paths = users.map((user) => ({
//     params: { id: user.id.toString() },
//   }));
//   return { paths, fallback: "blocking" };
// };

// export const getStaticProps: GetStaticProps<{ user: User | null }> = async ({
//   params,
// }) => {
//   const id = params?.id as string;
//   const user = await fetchUserById(id);
//   if (!user) return { notFound: true };
//   return { props: { user }, revalidate: 60 };
// };

// // =========== Component ===========
// export default function UserPage({ user }: Props) {
//   return (
//     <div className={CONTAINER}>
//       <Navbar />
//       <h1 className={HEADING}>User Detail</h1>
//       <div className={USER_CARD_WRAPPER}>
//         <div className={USER_CARD_CONTAINER}>
//           <div className={USER_IMAGE_WRAPPER}>
//             <Image
//               src={user.avatar}
//               alt={user.name}
//               fill
//               className={USER_CARD_IMAGE}
//             />
//           </div>
//           <h2 className={USER_NAME_STYLE}>{user.name}</h2>
//           <p className={USER_EMAIL_STYLE}>{user.email}</p>
//         </div>
//       </div>
//     </div>
//   );
// }
// /pages/users/[id].tsx
import { Navbar } from "@/components";
import { User } from "@/types";
import Image from "next/image";
import {
  CONTAINER,
  HEADING,
  USER_CARD_WRAPPER,
  USER_CARD_CONTAINER,
  USER_IMAGE_WRAPPER,
  USER_CARD_IMAGE,
  USER_NAME_STYLE,
  USER_EMAIL_STYLE,
} from "@/constants/classNames";
import { getUserPagePaths, getUserPageProps } from "@/services/userPageServices";

interface Props {
  user: User;
}

export const getStaticPaths = getUserPagePaths;
export const getStaticProps = getUserPageProps;

export default function UserPage({ user }: Props) {
  return (
    <div className={CONTAINER}>
      <Navbar />
      <h1 className={HEADING}>User Detail</h1>
      <div className={USER_CARD_WRAPPER}>
        <div className={USER_CARD_CONTAINER}>
          <div className={USER_IMAGE_WRAPPER}>
            <Image
              src={user.avatar}
              alt={user.name}
              fill
              className={USER_CARD_IMAGE}
            />
          </div>
          <h2 className={USER_NAME_STYLE}>{user.name}</h2>
          <p className={USER_EMAIL_STYLE}>{user.email}</p>
        </div>
      </div>
    </div>
  );
}
