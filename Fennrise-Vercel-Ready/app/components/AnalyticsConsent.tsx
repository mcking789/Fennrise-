"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import styles from "./AnalyticsConsent.module.css";

const STORAGE_KEY = "fennrise-analytics-consent";
const MEASUREMENT_ID = "G-Z5E7L5KYJ8";

type Consent = "granted" | "denied" | null;

export default function AnalyticsConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "granted" || saved === "denied") setConsent(saved);
    setReady(true);
  }, []);

  function choose(value: Exclude<Consent, null>) {
    window.localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  }

  if (!ready) return null;

  return (
    <>
      {consent === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="fennrise-ga4" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${MEASUREMENT_ID}', { send_page_view: true });`}
          </Script>
        </>
      )}

      {consent === null && (
        <aside className={styles.banner} aria-label="Analytics preference">
          <div>
            <strong>Optional analytics</strong>
            <p>
              We use analytics only to understand how Fennrise is used and improve the site.
              No advertising tracking.
            </p>
            <a href="/privacy-policy#cookies">Privacy Policy</a>
          </div>
          <div className={styles.actions}>
            <button className={styles.secondary} type="button" onClick={() => choose("denied")}>
              Essential only
            </button>
            <button className={styles.primary} type="button" onClick={() => choose("granted")}>
              Allow analytics
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
