import Link from "next/link";
import { NAVBAR_STYLE, NAV_LIST_STYLE } from "@/constants";
import { NAV_LABELS } from "@/constants";

export default function Navbar() {
  return (
    <nav className={NAVBAR_STYLE}>
      <ul className={NAV_LIST_STYLE}>
        <li>
          <Link href="/serverside">{NAV_LABELS.SERVER_SIDE}</Link>
        </li>
        <li>
          <Link href="/static">{NAV_LABELS.STATIC}</Link>
        </li>
      </ul>
    </nav>
  );
}
