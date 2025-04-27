import Link from "next/link";
import { Navbar } from "@/components";
import {
  PAGE_WRAPPER,
  CONTENT_WRAPPER,
  PAGE_TITLE,
  PAGE_SUBTITLE,
  LINK_BUTTON,
  LINK_GROUP,
} from "@/constants/classNames";
import { HOME_PAGE_CONTENT } from "@/constants";

export default function Home() {
  return (
    <div className={PAGE_WRAPPER}>
      <div className={CONTENT_WRAPPER}>
        <Navbar />
        <div className="text-center">
          <h1 className={PAGE_TITLE}>{HOME_PAGE_CONTENT.TITLE}</h1>
          <p className={PAGE_SUBTITLE}>
            {HOME_PAGE_CONTENT.SUBTITLE}
          </p>
          <div className={LINK_GROUP}>
            <Link href="/static" className={LINK_BUTTON}>
              {HOME_PAGE_CONTENT.STATIC_USERS_LINK}
            </Link>
            <Link href="/serverside" className={LINK_BUTTON}>
              {HOME_PAGE_CONTENT.SERVER_SIDE_USERS_LINK}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
