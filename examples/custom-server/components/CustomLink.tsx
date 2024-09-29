import Link from "next/link";

export const CustomLink = ({ children, href, ...props }) => {
  return (
    <Link {...props} prefetch={false} href={href}>
      {children}
    </Link>
  );
};
