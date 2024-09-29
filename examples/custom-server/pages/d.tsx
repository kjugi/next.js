import Link from "next/link";
import { CustomLink } from "../components/CustomLink";

export default function D() {
  return (
    <div>
      <p>d</p>
      <ul>
        <li>
          <Link href="/a">/a (Pages Router)</Link>
        </li>
        <li>
          <CustomLink href="/c">/c - no prefetch (Pages Router)</CustomLink>
        </li>
        <li>
          <a href="/e">/e - no prefetch a href (Pages Router)</a>
        </li>
      </ul>
    </div>
  );
}
