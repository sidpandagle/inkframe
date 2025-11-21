import type { Route } from "./+types/privacy";
import { Shield } from "lucide-react";
import { PageContainer } from "~/components/page-container";
import { PageHeader } from "~/components/page-header";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Privacy Policy - InkFrame" },
    {
      name: "description",
      content: "Privacy Policy for InkFrame.",
    },
  ];
}

export default function Privacy() {
  return (
    <PageContainer size="narrow">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <PageHeader
          icon={Shield}
          title="Privacy Policy"
          description="How we collect, use, and protect your information"
        />
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground">
          Last updated: November 20, 2025
        </div>
      </div>

      <div className="prose prose-lg max-w-none">

        <h2>1. Introduction</h2>
        <p>
          InkFrame ("we", "our", or "us") is committed to protecting your
          privacy. This Privacy Policy explains how we collect, use, disclose,
          and safeguard your information when you visit our website.
        </p>

        <h2>2. Information We Collect</h2>
        <h3>Personal Information</h3>
        <p>
          We may collect personal information that you voluntarily provide to us
          when you:
        </p>
        <ul>
          <li>Subscribe to our newsletter</li>
          <li>Fill out a contact form</li>
          <li>Engage with our content</li>
        </ul>
        <p>This information may include:</p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Any other information you choose to provide</li>
        </ul>

        <h3>Automatically Collected Information</h3>
        <p>
          When you visit our website, we may automatically collect certain
          information about your device, including:
        </p>
        <ul>
          <li>IP address</li>
          <li>Browser type</li>
          <li>Operating system</li>
          <li>Access times</li>
          <li>Pages viewed</li>
          <li>Referring website addresses</li>
        </ul>

        <h2>3. Use of Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Deliver and maintain our website</li>
          <li>Send you newsletters and marketing communications (with your consent)</li>
          <li>Respond to your inquiries and provide customer support</li>
          <li>Analyze usage trends and improve our content</li>
          <li>Protect against fraudulent or illegal activity</li>
        </ul>

        <h2>4. Disclosure of Your Information</h2>
        <p>
          We may share your information in the following situations:
        </p>
        <ul>
          <li>
            <strong>With Service Providers:</strong> We may share your
            information with third-party service providers who perform services
            on our behalf (e.g., email service providers, analytics providers)
          </li>
          <li>
            <strong>For Legal Purposes:</strong> We may disclose your information
            if required by law or in response to valid requests by public
            authorities
          </li>
          <li>
            <strong>Business Transfers:</strong> In connection with any merger,
            sale of company assets, or acquisition
          </li>
        </ul>

        <h2>5. Cookies and Tracking Technologies</h2>
        <p>
          We may use cookies and similar tracking technologies to track activity
          on our website and hold certain information. You can instruct your
          browser to refuse all cookies or to indicate when a cookie is being
          sent.
        </p>

        <h2>6. Data Security</h2>
        <p>
          We implement appropriate technical and organizational security measures
          to protect your personal information. However, no method of
          transmission over the internet or electronic storage is 100% secure.
        </p>

        <h2>7. Data Retention</h2>
        <p>
          We will retain your personal information only for as long as necessary
          to fulfill the purposes outlined in this Privacy Policy, unless a
          longer retention period is required or permitted by law.
        </p>

        <h2>8. Your Rights</h2>
        <p>Depending on your location, you may have the following rights:</p>
        <ul>
          <li>Access to your personal information</li>
          <li>Correction of inaccurate data</li>
          <li>Deletion of your personal information</li>
          <li>Object to processing of your personal information</li>
          <li>Data portability</li>
          <li>Withdraw consent</li>
        </ul>

        <h2>9. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites. We are not
          responsible for the privacy practices or content of these third-party
          sites.
        </p>

        <h2>10. Children's Privacy</h2>
        <p>
          Our website is not intended for children under 16 years of age. We do
          not knowingly collect personal information from children under 16.
        </p>

        <h2>11. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page and
          updating the "Last updated" date.
        </p>

        <h2>12. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at:
        </p>
        <p>
          Email: privacy@inkframe.com<br />
          Address: InkFrame Media Ltd., 123 Regulatory Boulevard, Legal District,
          LD1 2AB, United Kingdom
        </p>
      </div>
    </PageContainer>
  );
}
