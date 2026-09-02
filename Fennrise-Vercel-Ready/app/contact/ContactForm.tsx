"use client";

import { FormEvent, useState } from "react";
import styles from "./ContactForm.module.css";

type ContactFormProps = {
  initialService?: "studio" | "forge" | "general";
};

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm({ initialService = "general" }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

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

        <label>
          <span>What do you need?</span>
          <select name="service" defaultValue={initialService} required>
            <option value="studio">Studio — website / digital experience</option>
            <option value="forge">Forge — custom software / portal / dashboard</option>
            <option value="general">Not sure yet / other</option>
          </select>
        </label>
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
