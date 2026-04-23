import Link from "next/link";
import { type ComponentProps, forwardRef, type ReactNode } from "react";

export type SmartLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  children: ReactNode;
};

export const SmartLink = forwardRef<HTMLAnchorElement, SmartLinkProps>(
  function SmartLink({ href, children, ...rest }, ref) {
    if (
      href.startsWith("tel:") ||
      href.startsWith("mailto:") ||
      href.startsWith("#") ||
      href.startsWith("http://") ||
      href.startsWith("https://")
    ) {
      return (
        <a ref={ref} href={href} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link ref={ref} href={href} {...rest}>
        {children}
      </Link>
    );
  },
);
