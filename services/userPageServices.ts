// /services/userPageService.ts

import { GetStaticPaths, GetStaticProps } from "next";
import { fetchUserById, fetchUsers } from "@/lib";
import { User } from "@/types";

// Fetch paths for SSG
export const getUserPagePaths: GetStaticPaths = async () => {
  const users = await fetchUsers();
  const paths = users.map((user) => ({
    params: { id: user.id.toString() },
  }));
  return { paths, fallback: "blocking" };
};

// Fetch props for SSG
export const getUserPageProps: GetStaticProps<{ user: User | null }> = async ({
  params,
}) => {
  const id = params?.id as string;
  const user = await fetchUserById(id);
  if (!user) return { notFound: true };
  return { props: { user }, revalidate: 60 };
};
