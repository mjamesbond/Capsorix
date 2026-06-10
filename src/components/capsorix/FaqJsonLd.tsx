import { useI18n } from "@/i18n/I18nProvider";

/**
 * FAQPage JSON-LD for the homepage.
 * Injects a schema.org FAQPage structured data block so search engines
 * can surface rich results for each question / answer pair.
 */
const FaqJsonLd = () => {
  const { t, lang } = useI18n();
  const items = t.faq.items;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang === "ar" ? "ar" : lang === "fr" ? "fr" : lang === "de" ? "de" : "en",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default FaqJsonLd;
