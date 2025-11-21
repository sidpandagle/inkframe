import type { Route } from "./+types/disclaimer";
import { AlertTriangle } from "lucide-react";
import { PageContainer } from "~/components/page-container";
import { PageHeader } from "~/components/page-header";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Disclaimer - InkFrame" },
    {
      name: "description",
      content: "Legal disclaimer for InkFrame content and information.",
    },
  ];
}

export default function Disclaimer() {
  return (
    <PageContainer size="narrow">
      <div className="text-center mb-12">
        <PageHeader
          icon={AlertTriangle}
          title="Disclaimer"
          description="Important information about using our content"
        />
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground">
          Last updated: November 20, 2025
        </div>
      </div>

      <div className="prose prose-lg max-w-none">

        <h2>1. General Information</h2>
        <p>
          The information provided by InkFrame ("we", "us", or "our") on this
          website is for general informational purposes only. All information on
          the website is provided in good faith; however, we make no
          representation or warranty of any kind, express or implied, regarding
          the accuracy, adequacy, validity, reliability, availability, or
          completeness of any information on the website.
        </p>

        <h2>2. Not Legal Advice</h2>
        <p>
          <strong>
            The content on InkFrame is not intended to be and does not
            constitute legal advice.
          </strong>{" "}
          The information provided should not be relied upon as a substitute for
          consultation with professional legal, financial, or other competent
          advisers.
        </p>
        <p>
          While our editorial team comprises experienced legal and compliance
          professionals, the content on this website is for educational and
          informational purposes only. Before making any decision or taking any
          action that might affect your legal rights or obligations, you should
          consult with a qualified professional adviser in your jurisdiction.
        </p>

        <h2>3. No Professional Relationship</h2>
        <p>
          Your use of the website and your reliance on any information on the
          website is solely at your own risk. Use of this website does not create
          an attorney-client, advisor-client, or any other professional
          relationship between you and InkFrame or any of its contributors.
        </p>

        <h2>4. Accuracy and Currency of Information</h2>
        <p>
          Regulatory landscapes, particularly in the crypto and fintech sectors,
          are rapidly evolving. While we strive to keep our content current and
          accurate, laws and regulations change frequently. Information on this
          website may not reflect the most current legal or regulatory
          developments.
        </p>
        <p>
          We make no representations or warranties that the information provided
          is up-to-date or applicable to your specific situation or jurisdiction.
        </p>

        <h2>5. Jurisdiction-Specific Information</h2>
        <p>
          Laws and regulations vary significantly across jurisdictions. Content
          on this website may reference specific jurisdictions, but may not be
          applicable or accurate for your location. Always consult with local
          legal professionals for jurisdiction-specific guidance.
        </p>

        <h2>6. External Links</h2>
        <p>
          The website may contain links to external websites that are not
          provided or maintained by or in any way affiliated with InkFrame. We do
          not guarantee the accuracy, relevance, timeliness, or completeness of
          any information on these external websites.
        </p>

        <h2>7. No Endorsement</h2>
        <p>
          References to any specific commercial products, process, or service by
          trade name, trademark, manufacturer, or otherwise does not constitute
          or imply endorsement, recommendation, or favoring by InkFrame.
        </p>

        <h2>8. Third-Party Content</h2>
        <p>
          Some content on this website may be contributed by third parties,
          including guest authors. The views and opinions expressed in such
          content are those of the authors and do not necessarily reflect the
          official policy or position of InkFrame.
        </p>

        <h2>9. Limitation of Liability</h2>
        <p>
          Under no circumstance shall we have any liability to you for any loss
          or damage of any kind incurred as a result of the use of the website or
          reliance on any information provided on the website. Your use of the
          website and your reliance on any information on the website is solely
          at your own risk.
        </p>

        <h2>10. Investment Disclaimer</h2>
        <p>
          Nothing on this website should be construed as investment advice or a
          recommendation to buy, sell, or hold any cryptocurrency, token, or
          other digital asset. Cryptocurrency investments are highly volatile and
          risky. You should conduct your own research and consult with financial
          advisers before making any investment decisions.
        </p>

        <h2>11. No Tax Advice</h2>
        <p>
          The content on this website does not constitute tax advice. Tax laws
          are complex and vary by jurisdiction. You should consult with a
          qualified tax professional regarding your specific tax situation and
          obligations.
        </p>

        <h2>12. Changes to This Disclaimer</h2>
        <p>
          We may update this Disclaimer from time to time. Any changes will be
          posted on this page with an updated "Last updated" date.
        </p>

        <h2>13. Contact Information</h2>
        <p>
          If you have any questions about this Disclaimer, please contact us at
          legal@inkframe.com.
        </p>
      </div>
    </PageContainer>
  );
}
