import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const analyticsStyles = `
<style>
  .fennrise-analytics-consent{position:fixed;z-index:1000;right:20px;bottom:20px;width:min(540px,calc(100vw - 40px));display:grid;grid-template-columns:minmax(0,1fr) auto;gap:20px;align-items:center;padding:18px 18px 18px 20px;border:1px solid rgba(255,255,255,.1);border-radius:18px;background:rgba(12,12,11,.95);box-shadow:0 22px 70px rgba(0,0,0,.46);backdrop-filter:blur(20px);font-family:Inter,sans-serif}
  .fennrise-analytics-consent strong{display:block;margin-bottom:5px;color:#f3efe5;font-size:13px}.fennrise-analytics-consent p{margin:0;color:#8f8d86;font-size:11px;line-height:1.55}.fennrise-analytics-consent a{display:inline-block;margin-top:7px;color:#d6b620;font-size:10px;text-decoration:underline;text-underline-offset:3px}.fennrise-analytics-actions{display:flex;gap:8px}.fennrise-analytics-actions button{min-height:39px;padding:0 13px;border-radius:10px;cursor:pointer;font:600 11px Inter,sans-serif}.fennrise-essential{border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.035);color:#c4c1b8}.fennrise-allow{border:1px solid #fde050;background:#fde050;color:#15130e}.fennrise-honeypot{position:absolute!important;left:-9999px!important;width:1px!important;height:1px!important;overflow:hidden!important;opacity:0!important;pointer-events:none!important}
  @media(max-width:660px){.fennrise-analytics-consent{right:10px;bottom:10px;width:calc(100vw - 20px);grid-template-columns:1fr;gap:14px;padding:17px}.fennrise-analytics-actions{display:grid;grid-template-columns:1fr 1fr}}
</style>`;

const analyticsMarkup = `
<div class="fennrise-analytics-consent" id="fennriseAnalyticsConsent" hidden>
  <div><strong>Optional analytics</strong><p>We use analytics only to understand how Fennrise is used and improve the site. No advertising tracking.</p><a href="/privacy-policy#cookies">Privacy Policy</a></div>
  <div class="fennrise-analytics-actions"><button type="button" class="fennrise-essential" id="fennriseAnalyticsDeny">Essential only</button><button type="button" class="fennrise-allow" id="fennriseAnalyticsAllow">Allow analytics</button></div>
</div>
<script>
(function(){
  var key='fennrise-analytics-consent';
  var id='G-Z5E7L5KYJ8';
  var banner=document.getElementById('fennriseAnalyticsConsent');
  function loadAnalytics(){
    if(window.__fennriseAnalyticsLoaded) return;
    window.__fennriseAnalyticsLoaded=true;
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){window.dataLayer.push(arguments);};
    window.gtag('js',new Date());
    window.gtag('config',id,{send_page_view:true});
    var script=document.createElement('script');
    script.async=true;
    script.src='https://www.googletagmanager.com/gtag/js?id='+id;
    document.head.appendChild(script);
  }
  var saved=null;
  try{saved=localStorage.getItem(key);}catch(e){}
  if(saved==='granted') loadAnalytics();
  else if(saved!=='denied' && banner) banner.hidden=false;
  var allow=document.getElementById('fennriseAnalyticsAllow');
  var deny=document.getElementById('fennriseAnalyticsDeny');
  if(allow) allow.addEventListener('click',function(){try{localStorage.setItem(key,'granted');}catch(e){} if(banner)banner.hidden=true;loadAnalytics();});
  if(deny) deny.addEventListener('click',function(){try{localStorage.setItem(key,'denied');}catch(e){} if(banner)banner.hidden=true;});
})();
</script>`;

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
      )
      .replace(
        "showSuccessModal(firstName);",
        "showSuccessModal(firstName); if(window.gtag){window.gtag('event','waitlist_join',{source:'website'});}",
      )
      .replace(
        'msg.textContent = "Thanks for the input — it genuinely helps us build the right thing first.";',
        'msg.textContent = "Thanks for the input — it genuinely helps us build the right thing first."; if(window.gtag){window.gtag(\'event\',\'waitlist_survey_submit\');}',
      );

    // Restore normal browser zoom for accessibility. The original standalone
    // waitlist blocked pinch and double-tap zoom with JavaScript.
    html = html.replace(
      /\n\s*\/\/ belt-and-suspenders zoom lock:[\s\S]*?\}, \{ passive: false \}\);\n\n/,
      "\n",
    );

    html = html.replace("</head>", `${analyticsStyles}\n</head>`);
    html = html.replace("</body>", `${analyticsMarkup}\n</body>`);

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
