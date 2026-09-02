const FORMSPREE_ENDPOINT = "https://formspree.io/f/xaqzjzgz";
const MAX_BODY_BYTES = 64 * 1024;
const MAX_FIELDS = 30;

export const runtime = "nodejs";

function isAllowedOrigin(origin: string | null) {
  if (!origin) return true;

  try {
    const { hostname, protocol } = new URL(origin);
    if (protocol !== "https:" && hostname !== "localhost") return false;

    return (
      hostname === "www.fennrise.com" ||
      hostname === "fennrise.com" ||
      hostname === "localhost" ||
      hostname.endsWith(".vercel.app")
    );
  } catch {
    return false;
  }
}

function textValue(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request.headers.get("origin"))) {
      return Response.json({ ok: false, error: "Request origin not allowed." }, { status: 403 });
    }

    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return Response.json({ ok: false, error: "Submission is too large." }, { status: 413 });
    }

    const incoming = await request.formData();
    if ([...incoming.keys()].length > MAX_FIELDS) {
      return Response.json({ ok: false, error: "Invalid submission." }, { status: 400 });
    }

    // Honeypot fields are invisible to real users. Bots that fill them are
    // accepted with a quiet success response so they receive no useful signal.
    if (textValue(incoming, "website") || textValue(incoming, "_gotcha")) {
      return Response.json({ ok: true }, { status: 200 });
    }

    for (const [, value] of incoming.entries()) {
      if (typeof value !== "string" || value.length > 5000) {
        return Response.json({ ok: false, error: "Invalid submission." }, { status: 400 });
      }
    }

    const email = textValue(incoming, "email");
    const name = textValue(incoming, "name");
    const acceptedTerms = textValue(incoming, "terms_accepted");
    const isWaitlistJoin = Boolean(email || name || acceptedTerms);

    if (name && (name.length < 2 || name.length > 100)) {
      return Response.json({ ok: false, error: "Please enter a valid name." }, { status: 400 });
    }

    if (isWaitlistJoin) {
      const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!email || !looksLikeEmail || email.length > 254) {
        return Response.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
      }

      if (acceptedTerms !== "yes") {
        return Response.json(
          { ok: false, error: "Please accept the Privacy Policy and Terms of Service." },
          { status: 400 },
        );
      }
    }

    const outgoing = new FormData();
    for (const [key, value] of incoming.entries()) {
      if (key === "website" || key === "_gotcha") continue;
      outgoing.append(key, value);
    }
    outgoing.set("submission_source", "fennrise.com");

    const upstream = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: outgoing,
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    if (!upstream.ok) {
      console.error("Fennrise form provider returned an error", { status: upstream.status });
      return Response.json(
        { ok: false, error: "Unable to submit right now. Please try again." },
        { status: 502 },
      );
    }

    return Response.json(
      { ok: true },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error("Fennrise form submission failed", error instanceof Error ? error.message : "unknown error");
    return Response.json(
      { ok: false, error: "Unable to submit right now. Please try again." },
      { status: 500 },
    );
  }
}
