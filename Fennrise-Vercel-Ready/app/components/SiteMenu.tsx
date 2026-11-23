"use client";

import Image from "next/image";
import Link from "next/link";
import { animate } from "motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import css from "./SiteMenu.module.css";

const pages = [
  ["Fennrise", "/"], ["Albums", "/albums"], ["Products", "/products"],
  ["Services", "/services"], ["Roadmap", "/#roadmap"], ["About", "/about"],
  ["Contact", "/contact"], ["Privacy", "/privacy-policy"], ["Terms", "/terms-of-service"],
];

export default function SiteMenu() {
  const path = usePathname();
  const router = useRouter();
  const menu = useRef<HTMLDialogElement>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const pending = useRef("");
  const reveal = useRef<() => void>(() => {});

  useEffect(() => {
    if (pending.current === path) reveal.current();
    menu.current?.close();
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
      menu.current?.close();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      event.preventDefault();
      if (pending.current) return;
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

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  return <>
    <header className={css.head}>
      <Link className={css.wordmark} href="/" aria-label="Fennrise home"><Image src="/fennrise-logo.png" width={30} height={30} alt="" priority />Fennrise</Link>
      <div className={css.controls}>
        <Link className={css.albumLink} href="/albums" aria-current={path === "/albums" ? "page" : undefined}>Albums</Link>
        <button type="button" aria-haspopup="dialog" aria-expanded={open} aria-controls="site-directory" onClick={() => { menu.current?.showModal(); setOpen(true); }}>Menu <span aria-hidden="true">☰</span></button>
      </div>
    </header>
    <dialog ref={menu} id="site-directory" className={css.dialog} aria-label="Site menu" onClose={() => setOpen(false)} onClick={e => {
      if (e.target === menu.current) {
        const rect = menu.current.getBoundingClientRect();
        if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) menu.current.close();
      }
    }}>
      <div className={css.menuTop}><span>Fennrise</span><button onClick={() => menu.current?.close()} autoFocus>Close ×</button></div>
      <nav aria-label="Site navigation" className={css.directory}>
        {pages.map(([name, href], index) => <Link key={href} href={href} data-prominent={index < 2 || undefined} aria-current={path === href ? "page" : undefined} onClick={() => menu.current?.close()}>{name}<span aria-hidden="true">↗</span></Link>)}
      </nav>
    </dialog>
    <div hidden ref={curtain} aria-hidden="true" className={css.curtain}>
      <div><Image src="/fennrise-logo.png" alt="" width={92} height={92} /><span className={css.company}>Fennrise</span><span className={css.albums}>Albums</span></div>
    </div>
  </>;
}
