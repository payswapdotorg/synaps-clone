"use client";

/**
 * Header actions — transcribed behaviour from the analysed header: at the
 * top of the page only "Login" is visible; "Start designing free" and
 * "Book a call" slide in (max-width + opacity, staggered) once the visitor
 * has scrolled past the hero, mirroring the real site's
 * `.header.is-demo-shown` reveal. Links point into the clone's simulated
 * product routes.
 */
import Link from "next/link";
import { useEffect, useState } from "react";

export function HeaderActions() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`ms-header-actions${shown ? " is-shown" : ""}`}>
      <Link href="/login" className="ms-header-login">
        Login
      </Link>
      <Link href="/register" className="ms-btn ms-btn--sm ms-header-cta">
        Start designing free
      </Link>
      <Link href="/faq" className="ms-btn ms-btn--outline ms-btn--sm ms-header-cta">
        Book a call
      </Link>
    </div>
  );
}
