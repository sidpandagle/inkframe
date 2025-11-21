import type { Route } from "./+types/faq";
import { PageContainer } from "~/components/page-container";
import { PageHeader } from "~/components/page-header";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { generateFAQPageSchema } from "~/lib/structured-data";
import { StructuredData } from "~/components/structured-data";
import { HelpCircle, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Frequently Asked Questions - InkFrame" },
    {
      name: "description",
      content:
        "Find answers to common questions about crypto regulation, compliance, MiCA, and InkFrame's resources.",
    },
    {
      name: "keywords",
      content:
        "crypto FAQ, MiCA questions, compliance FAQ, regulatory questions, crypto regulation help",
    },
  ];
}

export default function FAQ() {
  const faqCategories = [
    {
      category: "About InkFrame",
      icon: "ℹ️",
      faqs: [
        {
          question: "What is InkFrame?",
          answer:
            "InkFrame is a comprehensive platform providing expert insights, analysis, and resources on crypto regulation, fintech law, and compliance frameworks. We serve crypto founders, legal teams, compliance officers, and industry professionals with authoritative, up-to-date information.",
        },
        {
          question: "Who writes the content on InkFrame?",
          answer:
            "Our content is created by experienced legal professionals, compliance experts, and industry analysts with deep expertise in crypto regulation, fintech law, and global compliance frameworks. Each piece undergoes rigorous editorial review to ensure accuracy and relevance.",
        },
        {
          question: "How often is content updated?",
          answer:
            "We publish new articles and updates regularly, with breaking news and regulatory changes covered as they happen. Our team monitors global regulatory developments daily to keep our audience informed of the latest changes.",
        },
        {
          question: "Is InkFrame content free?",
          answer:
            "Yes, all of our articles, compliance resources, and guides are freely accessible. We believe in democratizing access to critical regulatory information to help the entire crypto ecosystem stay compliant and informed.",
        },
      ],
    },
    {
      category: "Crypto Regulation",
      icon: "⚖️",
      faqs: [
        {
          question: "What is MiCA?",
          answer:
            "MiCA (Markets in Crypto-Assets) is the European Union's comprehensive regulatory framework for crypto assets. It establishes uniform rules for crypto asset issuers and service providers across all EU member states, covering aspects like authorization requirements, operational standards, consumer protection, and market integrity.",
        },
        {
          question: "When does MiCA come into effect?",
          answer:
            "MiCA was adopted in 2023 and is being implemented in phases. The provisions for stablecoins (asset-referenced tokens and e-money tokens) apply from June 30, 2024, while the broader framework for other crypto assets and service providers applies from December 30, 2024.",
        },
        {
          question: "What is the Travel Rule for crypto?",
          answer:
            "The Travel Rule requires Virtual Asset Service Providers (VASPs) to collect, verify, and transmit information about the originator and beneficiary of crypto asset transfers. This includes details like names, account numbers, and addresses for transactions above certain thresholds. It's based on FATF Recommendation 16 and aims to prevent money laundering and terrorist financing.",
        },
        {
          question: "Do I need a license to operate a crypto business?",
          answer:
            "Licensing requirements vary significantly by jurisdiction and the type of crypto activity. Most jurisdictions require licenses for activities like operating an exchange, providing custody services, or issuing crypto assets. We recommend consulting with legal professionals familiar with your specific jurisdiction and business model.",
        },
        {
          question: "What are the main regulatory challenges for DeFi?",
          answer:
            "DeFi faces several regulatory challenges including: determining who is responsible for compliance in decentralized protocols, applying traditional financial regulations to permissionless systems, implementing AML/KYC requirements without intermediaries, and addressing smart contract risks. Regulatory approaches to DeFi vary widely across jurisdictions and are still evolving.",
        },
      ],
    },
    {
      category: "Compliance & Best Practices",
      icon: "✅",
      faqs: [
        {
          question: "What is AML/KYC and why is it important?",
          answer:
            "AML (Anti-Money Laundering) and KYC (Know Your Customer) are processes used to verify customer identities and monitor transactions to prevent financial crimes. For crypto businesses, these are critical compliance requirements in most jurisdictions, helping prevent money laundering, terrorist financing, and other illicit activities while building trust with regulators and customers.",
        },
        {
          question: "How do I stay updated on regulatory changes?",
          answer:
            "Subscribe to InkFrame's newsletter for curated updates, follow official regulatory authorities in your jurisdictions, join industry associations, attend compliance webinars, and regularly review our Resources Hub. We also recommend working with legal counsel who specializes in crypto regulation for jurisdiction-specific guidance.",
        },
        {
          question: "What should be included in a compliance program?",
          answer:
            "A comprehensive compliance program should include: AML/KYC procedures, transaction monitoring systems, sanctions screening, internal controls and policies, regular risk assessments, compliance training for staff, record-keeping procedures, reporting mechanisms, and regular audits. The specific requirements depend on your jurisdiction and business type.",
        },
        {
          question: "How do I implement effective KYC procedures?",
          answer:
            "Effective KYC implementation includes: collecting required customer information (name, address, DOB, government ID), verifying identity through reliable sources, assessing customer risk levels, monitoring ongoing activity, updating information periodically, and maintaining secure records. Consider using specialized KYC/AML software solutions and ensure compliance with data protection regulations.",
        },
      ],
    },
    {
      category: "Using InkFrame Resources",
      icon: "📚",
      faqs: [
        {
          question: "Where can I find compliance checklists?",
          answer:
            "Visit our Resources Hub to access downloadable compliance checklists for various regulatory frameworks including MiCA compliance, AML/KYC implementation, and DeFi protocol compliance. These checklists are regularly updated to reflect the latest regulatory requirements.",
        },
        {
          question: "How can I search for specific topics?",
          answer:
            "Use the search function (Cmd/Ctrl + K) at the top of any page to search across all articles and compliance topics. You can search by keywords, regulations, jurisdictions, or specific terms. Articles can also be filtered by tags on the Articles page.",
        },
        {
          question: "Can I download articles for offline reading?",
          answer:
            "While individual articles aren't currently available for download, you can save them to your browser's reading list or use your browser's print-to-PDF function. We're exploring options for downloadable content in future updates.",
        },
        {
          question: "How do I request coverage of a specific topic?",
          answer:
            "We welcome topic suggestions! Please contact us through our Contact page with details about the regulatory topic or compliance issue you'd like us to cover. We prioritize topics based on community interest and regulatory relevance.",
        },
      ],
    },
    {
      category: "Jurisdictions & Global Coverage",
      icon: "🌍",
      faqs: [
        {
          question: "Which jurisdictions does InkFrame cover?",
          answer:
            "We provide coverage of crypto regulation across major jurisdictions including the European Union, United States, United Kingdom, Singapore, Hong Kong, Japan, Switzerland, and emerging crypto hubs. Our Jurisdiction Comparison tool in the Resources Hub provides detailed framework comparisons.",
        },
        {
          question: "How do regulatory approaches differ between regions?",
          answer:
            "Regulatory approaches vary significantly. The EU takes a comprehensive, harmonized approach with MiCA. The US has a fragmented, state-by-state system with multiple regulators. The UK has a principles-based FCA regime. Singapore follows a licensing model under the Payment Services Act. Each approach reflects different regulatory philosophies and priorities.",
        },
        {
          question: "What if my jurisdiction isn't covered?",
          answer:
            "We're continuously expanding our coverage. If your jurisdiction isn't currently featured, contact us to request coverage. Meanwhile, our general compliance principles and frameworks can often be adapted to local requirements with guidance from local legal counsel.",
        },
      ],
    },
  ];

  // Generate FAQ structured data
  const allFaqs = faqCategories.flatMap(category => category.faqs);
  const faqSchema = generateFAQPageSchema(allFaqs);

  return (
    <>
      <StructuredData data={faqSchema} />

      <PageContainer size="default">
        <PageHeader
          icon={HelpCircle}
          title="Frequently Asked Questions"
          description="Find answers to common questions about crypto regulation, compliance, and InkFrame's resources."
        />

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto space-y-12">
        {faqCategories.map((category, categoryIndex) => (
          <section key={categoryIndex}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{category.icon}</span>
              <h2 className="text-2xl font-bold">{category.category}</h2>
            </div>

            <Accordion type="single">
              {category.faqs.map((faq, faqIndex) => {
                const value = `${categoryIndex}-${faqIndex}`;
                return (
                  <AccordionItem key={value} value={value}>
                    <AccordionTrigger value={value} className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent value={value}>
                      <p className="leading-relaxed">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </section>
        ))}
      </div>

      {/* Still Have Questions CTA */}
      <div className="max-w-4xl mx-auto mt-20">
        <Card className="overflow-hidden">
          <CardContent className="p-10 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our team is here to help with your
                specific regulatory and compliance questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gradient-primary text-white">
                  <Link to="/contact">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Us
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/resources">
                    Browse Resources
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
    </>
  );
}
