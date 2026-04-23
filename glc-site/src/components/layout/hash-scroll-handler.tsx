"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToId(id: string, behavior: ScrollBehavior = "smooth") {
  const target = document.getElementById(id);
  const header = document.getElementById("site-header");
  if (!target) return false;
  const headerH = header?.offsetHeight ?? 0;
  const top =
    target.getBoundingClientRect().top + window.scrollY - headerH - 8;
  window.scrollTo({ top, behavior });
  return true;
}

/** After route change or direct load with `#id`, scroll matching section into view (header offset). */
function scrollToHashFromLocation(attempt = 0) {
  const raw = window.location.hash;
  if (!raw || raw === "#") return;
  const id = raw.slice(1);
  if (!id) return;

  const done = scrollToId(id, attempt === 0 ? "smooth" : "auto");
  if (!done && attempt < 24) {
    window.setTimeout(() => scrollToHashFromLocation(attempt + 1), 50);
  }
}

export function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    scrollToHashFromLocation();
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => scrollToHashFromLocation();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const header = document.getElementById("site-header");
    if (!header) return;

    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const a = t?.closest?.("a") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href) return;

      // Same-page #anchor (e.g. #request-site-visit on service pages)
      if (href.startsWith("#") && href.length > 1) {
        const id = href.slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        scrollToId(id, "smooth");
        history.pushState(null, "", href);
        return;
      }

      // On homepage: jump to section without a full navigation round-trip
      const homePath = pathname === "/" || pathname === "";
      if (homePath && href.startsWith("/#") && href.length > 3) {
        const id = href.slice(2);
        if (!id) return;
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        scrollToId(id, "smooth");
        history.pushState(null, "", href);
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  return null;
}
