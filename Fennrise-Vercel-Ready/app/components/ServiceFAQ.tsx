import styles from "./ServiceFAQ.module.css";

const questions = [
  {
    question: "What does Fennrise Studio build?",
    answer:
      "Studio focuses on premium websites and digital experiences, including landing pages, responsive company websites, web applications, UI/UX work, and the design systems needed to keep them consistent.",
  },
  {
    question: "What is the difference between Studio and Forge?",
    answer:
      "Studio is focused on the public-facing digital experience. Forge is for custom software such as portals, dashboards, internal tools, workflow automation, and web applications built around a business process.",
  },
  {
    question: "How are project scope and pricing decided?",
    answer:
      "We first understand the goal, required features, delivery expectations, and any third-party integrations. The project scope, price, payment milestones, revisions, ownership, and support are then written into the applicable quotation, proposal, statement of work, or client agreement before work begins.",
  },
  {
    question: "Who owns the finished website or software?",
    answer:
      "Ownership is defined in the project-specific agreement. Client-provided materials remain the client's property, while third-party software, libraries, fonts, APIs, hosting, and other licensed services remain subject to their own licences and terms.",
  },
  {
    question: "What happens after launch?",
    answer:
      "The applicable project agreement defines the post-launch bug-fix or support window and any ongoing maintenance. Existing clients can contact support@fennrise.com when they need help with a delivered project.",
  },
];

export default function ServiceFAQ() {
  return (
    <section className={styles.section} aria-labelledby="service-faq-title">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <span>Common questions</span>
          <h2 id="service-faq-title">Before we start a project.</h2>
          <p>
            A few useful answers about Studio, Forge, project scope, ownership, and
            support. Project-specific written terms always control the actual engagement.
          </p>
        </div>
        <div className={styles.items}>
          {questions.map((item, index) => (
            <details className={styles.item} key={item.question}>
              <summary><small>{String(index + 1).padStart(2, "0")}</small>{item.question}</summary>
              <div className={styles.answer}>{item.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
