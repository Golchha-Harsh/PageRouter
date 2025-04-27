import { USERS_API } from "@/constants";
import { User } from "@/types";

export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch(USERS_API);
  if (!res.ok) throw new Error("Failed to fetch users.");
  return res.json();
};

export const fetchUserById = async (id: string): Promise<User | null> => {
  try {
    const res = await fetch(`${USERS_API}/${id}`);
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};
