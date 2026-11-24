"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./ContactForm.module.css";

type ContactFormProps = {
  initialService?: "studio" | "forge" | "general";
};

type Status = "idle" | "sending" | "success" | "error";
type Service = "studio" | "forge" | "general";

const serviceOptions: { value: Service; title: string; detail: string }[] = [
  { value: "studio", title: "Studio", detail: "Website / digital experience" },
  { value: "forge", title: "Forge", detail: "Custom software / portal / dashboard" },
  { value: "general", title: "Not sure yet", detail: "Other / help me choose" },
];

export default function ContactForm({ initialService = "general" }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [service, setService] = useState<Service>(initialService);
  const [serviceOpen, setServiceOpen] = useState(false);
  const serviceRef = useRef<HTMLDivElement>(null);

  const selectedService = serviceOptions.find((option) => option.value === service) ?? serviceOptions[2];

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (serviceRef.current && !serviceRef.current.contains(event.target as Node)) {
        setServiceOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setServiceOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setMessage("");

    try {
      const form = event.currentTarget;
      const response = await fetch("/api/contact", {
        method: "POST",
        body: new FormData(form),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || "Unable to send your project enquiry right now.");
      }

      form.reset();
      setService(initialService);
      setServiceOpen(false);
      setStatus("success");
      setMessage("Project enquiry sent. Fennrise will contact you using the details you provided.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send your project enquiry right now.");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.honeypot} aria-hidden="true">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className={styles.grid}>
        <label>
          <span>Name</span>
          <input name="name" type="text" minLength={2} maxLength={100} autoComplete="name" required />
        </label>

        <label>
          <span>Email</span>
          <input name="email" type="email" maxLength={254} autoComplete="email" required />
        </label>

        <label>
          <span>Company / brand <small>optional</small></span>
          <input name="company" type="text" maxLength={120} autoComplete="organization" />
        </label>

        <div className={styles.serviceField} ref={serviceRef}>
          <span className={styles.serviceLabel}>What do you need?</span>
          <input type="hidden" name="service" value={service} />
          <button
            type="button"
            className={`${styles.serviceTrigger} ${serviceOpen ? styles.serviceTriggerOpen : ""}`}
            aria-haspopup="listbox"
            aria-expanded={serviceOpen}
            onClick={() => setServiceOpen((open) => !open)}
          >
            <span>
              <strong>{selectedService.title}</strong>
              <small>{selectedService.detail}</small>
            </span>
            <i aria-hidden="true">⌄</i>
          </button>

          {serviceOpen && (
            <div className={styles.serviceMenu} role="listbox" aria-label="What do you need?">
              {serviceOptions.map((option, index) => {
                const active = option.value === service;
                return (
                  <button
                    type="button"
                    key={option.value}
                    role="option"
                    aria-selected={active}
                    className={`${styles.serviceOption} ${active ? styles.serviceOptionActive : ""}`}
                    onClick={() => {
                      setService(option.value);
                      setServiceOpen(false);
                    }}
                  >
                    <b>{String(index + 1).padStart(2, "0")}</b>
                    <span>
                      <strong>{option.title}</strong>
                      <small>{option.detail}</small>
                    </span>
                    <i aria-hidden="true">{active ? "●" : "→"}</i>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <label className={styles.full}>
        <span>Tell us about the project</span>
        <textarea
          name="details"
          minLength={10}
          maxLength={3000}
          rows={7}
          placeholder="What are you trying to build, what problem should it solve, and what do you need from Fennrise?"
          required
        />
      </label>

      <div className={styles.footer}>
        <p>No public project pricing is shown here. We review the requirement and discuss the quote directly with you.</p>
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send project enquiry"} <b>→</b>
        </button>
      </div>

      {message && (
        <div className={`${styles.status} ${status === "success" ? styles.success : styles.error}`} role="status">
          {message}
        </div>
      )}
    </form>
  );
}
