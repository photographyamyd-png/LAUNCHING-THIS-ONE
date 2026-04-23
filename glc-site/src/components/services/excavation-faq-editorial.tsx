import hub from "@/content/pages/excavation-hub-seo.json";

const faqItems = hub.faq as Array<{ question: string; answer: string }>;

function AnswerBody({ answer, index }: { answer: string; index: number }) {
  if (index === 1) {
    const needle = "Ontario One Call (1-800-400-2255)";
    const parts = answer.split(needle);
    if (parts.length === 2) {
      return (
        <>
          {parts[0]}
          Ontario One Call (
          <a href="tel:+18004002255" className="exc-faq__link">
            1-800-400-2255
          </a>
          ){parts[1]}
        </>
      );
    }
  }
  return <>{answer}</>;
}

export function ExcavationFaqEditorial() {
  return (
    <section
      id="excavation-faq"
      className="exc-faq gl-reveal"
      aria-labelledby="exc-faq-heading"
    >
      <div className="exc-faq__inner">
        <header className="exc-faq__header">
          <p className="gl-eyebrow gl-eyebrow--dark">Field notes</p>
          <h2 id="exc-faq-heading" className="gl-h2 exc-faq__heading">
            Excavation FAQs
          </h2>
        </header>

        <ol className="exc-faq__rail">
          {faqItems.map((item, index) => (
            <li key={item.question} className="exc-faq__item gl-reveal">
              <div className="exc-faq__marker">
                <span className="exc-faq__num">{String(index + 1).padStart(2, "0")}</span>
                <span className="exc-faq__rail-line" aria-hidden />
              </div>
              <div className="exc-faq__card">
                <h3 className="exc-faq__q">{item.question}</h3>
                <div className="exc-faq__a">
                  <p className="gl-prose exc-faq__a-text">
                    <AnswerBody answer={item.answer} index={index} />
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
