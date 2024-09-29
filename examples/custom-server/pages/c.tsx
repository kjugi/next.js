import { CustomLink } from "../components/CustomLink";

export default function C() {
  return (
    <div>
      <p>c</p>
      <ul>
        <li>
          <CustomLink href="/a">/a - no prefetch (Pages Router)</CustomLink>
        </li>
        <li>
          <CustomLink href="/d">/d - no prefetch (Pages Router)</CustomLink>
        </li>
        <li>
          <CustomLink href="/e">/e - no prefetch (Pages Router)</CustomLink>
        </li>
      </ul>
    </div>
  );
}
