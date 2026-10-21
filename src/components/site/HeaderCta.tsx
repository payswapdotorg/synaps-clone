"use client";

/**
 * Header CTA — the analysed site shows "Start designing free" in the
 * header on inner pages but not on the home route (the hero carries it
 * there), so this client piece reads the pathname.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderCta() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <Link href="/register" className="ms-btn ms-btn--sm hidden sm:inline-flex">
      Start designing free
    </Link>
  );
}
