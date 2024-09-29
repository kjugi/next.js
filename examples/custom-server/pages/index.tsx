import Link from "next/link";

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/a">/a - prefetch (Pages Router)</Link>
      </li>
      <li>
        <Link href="/b">b (App Router)</Link>
      </li>
      <li>
        <Link href="/c">c - prefetch (Pages Router)</Link>
      </li>
      <li>
        <Link href="/d">d - prefetch (Pages Router)</Link>
      </li>
    </ul>
  );
}
