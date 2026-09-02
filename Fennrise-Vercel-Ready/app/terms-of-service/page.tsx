import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — Fennrise",
  description: "Terms that apply when you access Fennrise and its waitlist.",
  alternates: { canonical: "/terms-of-service" },
};

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of these terms",
    content: (
      <p>
        These Terms of Service (&quot;Terms&quot;) apply when you visit
        <a href="https://www.fennrise.com"> www.fennrise.com</a>, join the Fennrise waitlist,
        submit feedback, or use another Fennrise website experience that links to these
        Terms. By using those services, you agree to these Terms and our
        <a href="/privacy-policy"> Privacy Policy</a>. If you do not agree, please do
        not use the services.
      </p>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility",
    content: (
      <>
        <p>
          You must be legally capable of agreeing to these Terms. If you are under 18,
          you may use the website or join the waitlist only with permission and
          supervision from your parent or legal guardian.
        </p>
        <p>
          A parent or guardian who permits a minor to use Fennrise is responsible for
          that minor&apos;s use of the services to the extent permitted by law.
        </p>
      </>
    ),
  },
  {
    id: "website-waitlist",
    title: "Website and waitlist",
    content: (
      <>
        <p>
          The website introduces Fennrise and products that may be in development.
          Joining the waitlist records your interest and may allow us to send launch,
          testing, or early-access updates. It does not guarantee access, a release
          date, a specific feature, availability, or pricing.
        </p>
        <p>
          We may change, pause, test, limit, or discontinue website features or
          pre-release plans as Fennrise develops.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    content: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>break the law or infringe another person&apos;s rights;</li>
          <li>submit false, harmful, abusive, or misleading information;</li>
          <li>attempt to gain unauthorised access to our systems or another user&apos;s data;</li>
          <li>interfere with security, availability, rate limits, or normal operation;</li>
          <li>introduce malware, automate abusive requests, scrape protected areas, or reverse engineer the services except where law expressly permits it; or</li>
          <li>misrepresent an affiliation with Fennrise.</li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    content: (
      <p>
        Fennrise and its licensors own the website design, branding, logos, software,
        text, graphics, and other original materials made available through the
        services, except content clearly identified as belonging to someone else.
        These Terms give you a limited, personal, revocable, non-exclusive right to
        access the website for its intended purpose. They do not transfer ownership or
        permit you to copy, sell, modify, or commercially exploit our materials without
        written permission.
      </p>
    ),
  },
  {
    id: "ip-complaints",
    title: "Intellectual property complaints",
    content: (
      <p>
        If you believe your trademark, copyright, or other intellectual property is
        being used on this website without permission, email
        <a href="mailto:legal@fennrise.com"> legal@fennrise.com</a> with the subject
        &quot;IP Complaint&quot;, a description of the material, where it appears, and
        reasonable proof of your ownership or authority. We will review the complaint
        and aim to respond within 10 business days, including removing or correcting
        material we determine to be infringing where appropriate.
      </p>
    ),
  },
  {
    id: "feedback",
    title: "Feedback and submissions",
    content: (
      <p>
        If you send optional product feedback or survey responses, you allow Fennrise
        to use those ideas and suggestions to evaluate and improve its products without
        an obligation to compensate you. You keep ownership of content that you already
        own. Do not submit confidential information or material you do not have the
        right to share.
      </p>
    ),
  },
  {
    id: "third-parties",
    title: "Third-party services",
    content: (
      <p>
        Fennrise may rely on or link to third-party services, including Vercel for
        hosting, Formspree for form submissions, and optional Google Analytics for
        website measurement when you allow analytics. Their services are governed by
        their own terms and policies. We are not responsible for third-party content,
        availability, or practices, although we select providers intended to support
        the website responsibly.
      </p>
    ),
  },
  {
    id: "client-services",
    title: "Client services and project agreements",
    content: (
      <>
        <p>
          Fennrise may provide paid website, design, software, automation, or related
          client services. A quotation, proposal, statement of work, order form, or
          signed client agreement may set the specific scope, deliverables, revisions,
          timeline, fees, ownership, support, third-party costs, and other project terms.
        </p>
        <p>
          Those project-specific written terms govern the relevant paid project. If a
          project-specific written agreement conflicts with these general website Terms,
          the project-specific agreement controls for that project to the extent of the
          conflict.
        </p>
      </>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    content: (
      <>
        <p>
          The website, waitlist, and pre-release information are provided on an
          &quot;as is&quot; and &quot;as available&quot; basis. To the maximum extent
          permitted by law, we do not promise that the services will always be
          uninterrupted, error-free, secure, or suitable for a particular purpose.
        </p>
        <p>
          Product descriptions, roadmaps, concepts, and expected features may change.
          Website content is general information and is not legal, financial, medical,
          academic, or other professional advice.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    content: (
      <p>
        To the maximum extent permitted by law, Fennrise will not be liable for
        indirect, incidental, special, consequential, exemplary, or loss-of-profit or
        loss-of-data damages arising from the free website, waitlist, third-party
        services, or these Terms. Where liability cannot legally be excluded, our total
        liability relating to the free website or waitlist will not exceed INR 1,000.
        Liability for a paid client project is governed by the applicable written client
        agreement. Nothing in these Terms limits liability that cannot be limited under
        applicable law or affects mandatory consumer rights.
      </p>
    ),
  },
  {
    id: "payments",
    title: "Payments, billing and refunds",
    content: (
      <p>
        This section applies if Fennrise begins charging for a product, subscription,
        service, or custom work through the website. Pricing will be shown or agreed
        before payment. Billing, cancellation, refund, milestone, and delivery terms
        will follow the specific terms shown at purchase or in the applicable written
        client agreement. Fennrise does not directly store full card or banking details
        unless explicitly stated; payment providers may process those details under
        their own terms.
      </p>
    ),
  },
  {
    id: "suspension",
    title: "Suspension and termination",
    content: (
      <p>
        We may restrict or end access where reasonably necessary to protect Fennrise,
        its users, or third parties; respond to unlawful or abusive activity; comply
        with law; or discontinue a service. You may stop using the website at any time
        and may ask to be removed from the waitlist by emailing us.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    content: (
      <p>
        We may update these Terms as our products, practices, or legal obligations
        change. The updated Terms will be posted here with a new effective date.
        Material changes may also be announced on the website or by email where
        appropriate. Continued use after the effective date means the updated Terms
        apply to your future use.
      </p>
    ),
  },
  {
    id: "law-contact",
    title: "Governing law and contact",
    content: (
      <>
        <p>
          These Terms are governed by the laws of India. Subject to any mandatory rights
          or dispute process under applicable law, disputes will be subject to the
          jurisdiction of competent courts in India.
        </p>
        <ul>
          <li><strong>Legal notices, disputes and IP complaints:</strong> <a href="mailto:legal@fennrise.com">legal@fennrise.com</a></li>
          <li><strong>Privacy and data requests:</strong> <a href="mailto:privacy@fennrise.com">privacy@fennrise.com</a></li>
          <li><strong>Service support:</strong> <a href="mailto:support@fennrise.com">support@fennrise.com</a></li>
          <li><strong>General enquiries:</strong> <a href="mailto:connect@fennrise.com">connect@fennrise.com</a></li>
        </ul>
        <p>Fennrise is based in India.</p>
      </>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalPage
      eyebrow="Legal · Using Fennrise"
      title="Terms of Service"
      description="The rules that apply when you visit Fennrise, join the waitlist, use website services, or share feedback."
      updated="2 September 2026"
      sections={sections}
    />
  );
}
