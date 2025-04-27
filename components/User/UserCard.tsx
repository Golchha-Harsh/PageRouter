import { User } from "@/types";
import Image from "next/image";
import Link from "next/link";

import {
  USER_CARD_LINK,
  USER_CARD_CONTAINER,
  USER_CARD_IMAGE,
  USER_NAME_STYLE,
  USER_EMAIL_STYLE,
} from "@/constants";

interface Props {
  user: User;
}

export default function UserCard({ user }: Props) {
  return (
    <Link href={`/user/${user.id}`} className={USER_CARD_LINK}>
      <div className={USER_CARD_CONTAINER}>
        <div className="relative w-18 h-18">
          <Image
            src={user.avatar}
            alt={user.name}
            fill
            className={USER_CARD_IMAGE}
          />
        </div>
        <div>
          <h2 className={USER_NAME_STYLE}>{user.name}</h2>
          <p className={USER_EMAIL_STYLE}>{user.email}</p>
        </div>
      </div>
    </Link>
  );
}
