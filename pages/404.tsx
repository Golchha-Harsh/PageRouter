import Link from "next/link";
import {
  PAGE_WRAPPER,
  HEADING,
  TEXT_MUTED,
  LINK_BUTTON,
} from "@/constants/classNames"; // Notice updated imports
import { NOT_FOUND_CONTENT } from "@/constants";

export default function Custom404() {
  return (
    <div className={PAGE_WRAPPER}>
      <div className="text-center mt-20">
        <h1 className={HEADING}>{NOT_FOUND_CONTENT.TITLE}</h1>
        <p className={`${TEXT_MUTED} text-lg mb-8`}>
         {NOT_FOUND_CONTENT.MESSAGE}
        </p>
        <Link href="/" className={LINK_BUTTON}>
          {NOT_FOUND_CONTENT.LINK_TEXT}
        </Link>
      </div>
    </div>
  );
}
