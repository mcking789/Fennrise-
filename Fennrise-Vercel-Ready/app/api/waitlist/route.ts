const FORMSPREE_ENDPOINT = "https://formspree.io/f/xaqzjzgz";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const incoming = await request.formData();

    // Basic validation for the main waitlist form. The survey intentionally
    // has no email field, so only validate email when one is submitted.
    const emailValue = incoming.get("email");
    if (typeof emailValue === "string" && emailValue.trim()) {
      const email = emailValue.trim();
      const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!looksLikeEmail || email.length > 254) {
        return Response.json(
          { ok: false, error: "Please enter a valid email address." },
          { status: 400 },
        );
      }
    }

    // Forward the submission from the server instead of posting to Formspree
    // directly from the browser. This avoids browser/CORS/ad-blocker issues
    // while keeping the existing Formspree inbox and workflow unchanged.
    const outgoing = new FormData();
    for (const [key, value] of incoming.entries()) {
      outgoing.append(key, value);
    }

    const upstream = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: outgoing,
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const contentType = upstream.headers.get("content-type") || "application/json; charset=utf-8";
    const body = await upstream.text();

    if (!upstream.ok) {
      console.error("Fennrise waitlist upstream error", {
        status: upstream.status,
        body: body.slice(0, 500),
      });
    }

    return new Response(body || JSON.stringify({ ok: upstream.ok }), {
      status: upstream.status,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Fennrise waitlist submission failed", error);
    return Response.json(
      { ok: false, error: "Unable to join the waitlist right now. Please try again." },
      { status: 500 },
    );
  }
}
