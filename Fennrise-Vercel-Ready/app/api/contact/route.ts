const FORMSPREE_ENDPOINT = "https://formspree.io/f/xaqzjzgz";
const MAX_BODY_BYTES = 64 * 1024;

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
    if (textValue(incoming, "website")) {
      return Response.json({ ok: true }, { status: 200 });
    }

    const name = textValue(incoming, "name");
    const email = textValue(incoming, "email");
    const company = textValue(incoming, "company");
    const service = textValue(incoming, "service");
    const details = textValue(incoming, "details");

    if (name.length < 2 || name.length > 100) {
      return Response.json({ ok: false, error: "Please enter a valid name." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return Response.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!["studio", "forge", "general"].includes(service)) {
      return Response.json({ ok: false, error: "Please choose a valid project type." }, { status: 400 });
    }

    if (company.length > 120 || details.length < 10 || details.length > 3000) {
      return Response.json({ ok: false, error: "Please provide a valid project description." }, { status: 400 });
    }

    const outgoing = new FormData();
    outgoing.set("name", name);
    outgoing.set("email", email);
    outgoing.set("company", company);
    outgoing.set("service", service);
    outgoing.set("details", details);
    outgoing.set("form_type", "project_enquiry");
    outgoing.set("submission_source", "fennrise.com/contact");
    outgoing.set("_subject", `Fennrise ${service === "studio" ? "Studio" : service === "forge" ? "Forge" : "Project"} enquiry`);

    const upstream = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: outgoing,
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    if (!upstream.ok) {
      console.error("Fennrise contact provider returned an error", { status: upstream.status });
      return Response.json(
        { ok: false, error: "Unable to send your enquiry right now. Please try again." },
        { status: 502 },
      );
    }

    return Response.json(
      { ok: true },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Fennrise contact submission failed", error instanceof Error ? error.message : "unknown error");
    return Response.json(
      { ok: false, error: "Unable to send your enquiry right now. Please try again." },
      { status: 500 },
    );
  }
}
