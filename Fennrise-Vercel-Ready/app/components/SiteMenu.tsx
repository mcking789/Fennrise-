"use client";

import Image from "next/image";
import Link from "next/link";
import { animate } from "motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import css from "./SiteMenu.module.css";

const pages = [
  ["Products", "/products"], ["Services", "/services"],
  ["About", "/about"], ["Contact", "/contact"],
];

export default function SiteMenu() {
  const path = usePathname();
  const router = useRouter();
  const curtain = useRef<HTMLDivElement>(null);
  const pending = useRef("");
  const reveal = useRef<() => void>(() => {});

  useEffect(() => {
    if (pending.current === path) reveal.current();
  }, [path]);

  useEffect(() => {
    const panel = curtain.current!;
    let animation: ReturnType<typeof animate> | undefined;
    let timeout: ReturnType<typeof setTimeout>;
    let serial = 0;
    function reset() {
      ++serial;
      clearTimeout(timeout);
      animation?.stop();
      pending.current = "";
      panel.hidden = true;
    }
    reveal.current = () => {
      clearTimeout(timeout);
      const token = serial;
      animation = animate(panel, { opacity: 0 }, { duration: 0.20 });
      animation.then(() => { if (token === serial) reset(); });
    };
    function follow(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link || link.target || link.hasAttribute("download")) return;
      const dest = new URL(link.href);
      if (dest.origin !== location.origin || dest.hash || dest.search || !["/", "/albums"].includes(dest.pathname)) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      event.preventDefault();
      if (pending.current === dest.pathname) return;
      if (pending.current) reset();
      pending.current = dest.pathname;
      const token = ++serial;
      panel.dataset.destination = dest.pathname === "/" ? "company" : "albums";
      panel.hidden = false;
      animation = animate(panel, { opacity: [0, 1] }, { duration: 0.17 });
      timeout = setTimeout(() => {
        if (token !== serial) return;
        if (location.pathname === dest.pathname) {
          router.replace(dest.pathname);
          window.scrollTo({ top: 0, behavior: "instant" });
          reveal.current();
        } else {
          router.push(dest.pathname);
          timeout = setTimeout(reset, 3500);
        }
      }, 340);
    }
    document.addEventListener("click", follow, true);
    window.addEventListener("popstate", reset);
    return () => {
      reset();
      document.removeEventListener("click", follow, true);
      window.removeEventListener("popstate", reset);
    };
  }, [router]);

  return <>
    <header className={css.head}>
      {/* Edge refraction map adapted from rdev/liquid-glass-react (MIT, public/glass/LICENSE.txt). */}
      <svg width="0" height="0" aria-hidden="true" style={{position:"absolute",pointerEvents:"none"}}>
        <defs><filter id="fenn-nav-glass" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feImage href="/glass/displacement.jpg" width="100%" height="100%" preserveAspectRatio="none" result="edge" />
          <feDisplacementMap in="SourceGraphic" in2="edge" scale="-8" xChannelSelector="R" yChannelSelector="B" />
        </filter></defs>
      </svg>
      <Link className={css.wordmark} href="/" aria-label="Fennrise home"><Image src="/fennrise-logo.png" width={30} height={30} alt="" priority />Fennrise</Link>
      <nav className={css.shortcuts} aria-label="Company pages">
        {pages.map(([label,href])=><Link key={href} href={href} aria-current={path===href?"page":undefined}>{label}</Link>)}
      </nav>
      <Link className={css.albumLink} href="/albums" aria-current={path === "/albums" ? "page" : undefined}>Albums</Link>
    </header>
    <div hidden ref={curtain} aria-hidden="true" className={css.curtain}>
      <div><Image src="/fennrise-logo.png" alt="" width={92} height={92} /><span className={css.company}>Fennrise</span><span className={css.albums}>Albums</span></div>
    </div>
  </>;
}
