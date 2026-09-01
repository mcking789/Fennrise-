import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "waitlist.html");
    const html = await readFile(filePath, "utf8");

    // Keep the current waitlist design exactly as-is, but submit through our
    // own same-origin endpoint so the Join button does not depend on a direct
    // browser request to Formspree.
    const patched = html.replaceAll(
      'action="https://formspree.io/f/xaqzjzgz"',
      'action="/api/waitlist"',
    );

    return new Response(patched, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Unable to render Fennrise waitlist", error);
    return new Response("Waitlist temporarily unavailable.", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
