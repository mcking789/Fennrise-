import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const waitlistBrandStyles = `
<style>
  .fennrise-honeypot{position:absolute!important;left:-9999px!important;width:1px!important;height:1px!important;overflow:hidden!important;opacity:0!important;pointer-events:none!important}
  .fennrise-main-logo{display:inline-flex;align-items:center;text-decoration:none}
  .fennrise-main-logo img{display:block;width:auto;height:31px;object-fit:contain}
  .footer-brand .fennrise-main-logo img{height:27px}
  @media(max-width:560px){.fennrise-main-logo img{height:27px}.footer-brand .fennrise-main-logo img{height:25px}}
</style>`;

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "waitlist.html");
    let html = await readFile(filePath, "utf8");

    html = html
      .replace(
        '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
      )
      .replaceAll("https://fennrise.com/waitlist", "https://www.fennrise.com/waitlist")
      .replaceAll('action="https://formspree.io/f/xaqzjzgz"', 'action="/api/waitlist"')
      .replaceAll('href="privacy.html"', 'href="/privacy-policy"')
      .replaceAll('href="terms.html"', 'href="/terms-of-service"')
      .replaceAll(
        'method="POST">',
        'method="POST"><div class="fennrise-honeypot" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>',
      );

    // Use the same current Fennrise logo as the main website on the waitlist.
    html = html.replace(
      /<div class="logo">[\s\S]*?FENNRISE\s*<\/div>/,
      '<a class="logo fennrise-main-logo" href="/" aria-label="Fennrise home"><img src="/fennrise-logo.png" alt="Fennrise"></a>',
    );
    html = html.replace(
      /<div class="brand-row">[\s\S]*?Fennrise\s*<\/div>/,
      '<a class="brand-row fennrise-main-logo" href="/" aria-label="Fennrise home"><img src="/fennrise-logo.png" alt="Fennrise"></a>',
    );

    // Restore normal browser zoom for accessibility. The original standalone
    // waitlist blocked pinch and double-tap zoom with JavaScript.
    html = html.replace(
      /\n\s*\/\/ belt-and-suspenders zoom lock:[\s\S]*?\}, \{ passive: false \}\);\n\n/,
      "\n",
    );

    html = html.replace("</head>", `${waitlistBrandStyles}\n</head>`);

    return new Response(html, {
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
