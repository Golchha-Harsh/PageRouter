import { User } from "@/types/user";
import Image from "next/image";
import Link from "next/link";

interface Props {
  user: User;
}

export default function UserCard({ user }: Props) {
  return (
    <Link href={`/user/${user.id}`} className="block">
      <div className="p-4 bg-white rounded-2xl shadow-md flex items-center gap-4 transition hover:scale-[1.02]">
        <div className="relative w-16 h-16">
          <Image
            src={user.avatar}
            alt={user.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      </div>
    </Link>
  );
}
