"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./ExperienceChrome.module.css";

export function ExperienceFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <Link href="/" data-brand-route className={styles.brand}><Image src="/fennrise-logo.png" alt="" width={38} height={38} /><span>Fennrise</span></Link>
        <p>An independent technology team in India.</p>
        <div><Link href="/products">Products</Link><Link href="/services">Services</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></div>
      </div>
      <div className={styles.footerBottom}><span>© 2026 Fennrise. All rights reserved.</span><div><Link href="/privacy-policy">Privacy Policy</Link><Link href="/terms-of-service">Terms of Service</Link></div><Link href="#page-top">Back to top</Link></div>
    </footer>
  );
}
