import Link from "next/link";

export default function A() {
  return (
    <div>
      <p>a</p>
      <ul>
        <li>
          <Link href="/">index prefetch (page router)</Link>
        </li>
      </ul>
    </div>
  );
}
