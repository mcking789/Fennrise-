import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>

      <section className={styles.card}>

        <h1>Page not found</h1>
        <p>
          The address may have changed, or the page may no longer exist. You can return
          to Fennrise or continue exploring our products and services.
        </p>
        <div className={styles.actions}>
          <Link className={styles.primary} href="/">Back to Fennrise</Link>
          <Link className={styles.secondary} href="/products">Explore products</Link>
          <Link className={styles.secondary} href="/services">Explore services</Link>
        </div>
      </section>
    </main>
  );
}
