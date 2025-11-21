import type { Route } from "./+types/terms";
import { FileText } from "lucide-react";
import { PageContainer } from "~/components/page-container";
import { PageHeader } from "~/components/page-header";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Terms of Service - InkFrame" },
    {
      name: "description",
      content: "Terms of Service for using InkFrame.",
    },
  ];
}

export default function Terms() {
  return (
    <PageContainer size="narrow">
      <div className="text-center mb-12">
        <PageHeader
          icon={FileText}
          title="Terms of Service"
          description="Terms and conditions for using our services"
        />
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground">
          Last updated: November 20, 2025
        </div>
      </div>

      <div className="prose prose-lg max-w-none">

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using InkFrame ("the Website"), you accept and agree
          to be bound by the terms and provision of this agreement. If you do
          not agree to these Terms of Service, please do not use the Website.
        </p>

        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily access the materials (information
          or software) on InkFrame for personal, non-commercial transitory
          viewing only. This is the grant of a license, not a transfer of title,
          and under this license you may not:
        </p>
        <ul>
          <li>Modify or copy the materials</li>
          <li>
            Use the materials for any commercial purpose, or for any public
            display (commercial or non-commercial)
          </li>
          <li>
            Attempt to decompile or reverse engineer any software contained on
            InkFrame
          </li>
          <li>
            Remove any copyright or other proprietary notations from the
            materials
          </li>
          <li>
            Transfer the materials to another person or "mirror" the materials on
            any other server
          </li>
        </ul>

        <h2>3. Content Disclaimer</h2>
        <p>
          The materials on InkFrame are provided on an 'as is' basis. InkFrame
          makes no warranties, expressed or implied, and hereby disclaims and
          negates all other warranties including, without limitation, implied
          warranties or conditions of merchantability, fitness for a particular
          purpose, or non-infringement of intellectual property or other
          violation of rights.
        </p>

        <h2>4. Limitations</h2>
        <p>
          In no event shall InkFrame or its suppliers be liable for any damages
          (including, without limitation, damages for loss of data or profit, or
          due to business interruption) arising out of the use or inability to
          use the materials on InkFrame, even if InkFrame or an authorized
          representative has been notified orally or in writing of the
          possibility of such damage.
        </p>

        <h2>5. Accuracy of Materials</h2>
        <p>
          The materials appearing on InkFrame could include technical,
          typographical, or photographic errors. InkFrame does not warrant that
          any of the materials on its website are accurate, complete, or current.
          InkFrame may make changes to the materials contained on its website at
          any time without notice.
        </p>

        <h2>6. Links</h2>
        <p>
          InkFrame has not reviewed all of the sites linked to its website and is
          not responsible for the contents of any such linked site. The inclusion
          of any link does not imply endorsement by InkFrame of the site. Use of
          any such linked website is at the user's own risk.
        </p>

        <h2>7. Modifications</h2>
        <p>
          InkFrame may revise these terms of service for its website at any time
          without notice. By using this website you are agreeing to be bound by
          the then current version of these terms of service.
        </p>

        <h2>8. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance
          with the laws of the United Kingdom and you irrevocably submit to the
          exclusive jurisdiction of the courts in that location.
        </p>

        <h2>9. Contact Information</h2>
        <p>
          If you have any questions about these Terms of Service, please contact
          us at legal@inkframe.com.
        </p>
      </div>
    </PageContainer>
  );
}
