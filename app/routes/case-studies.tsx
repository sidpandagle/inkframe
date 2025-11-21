import type { Route } from "./+types/case-studies";
import { Link } from "react-router";
import { PageContainer } from "~/components/page-container";
import { PageHeader } from "~/components/page-header";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  Briefcase,
  Building2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Shield,
  FileText,
  ExternalLink,
} from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Case Studies - InkFrame" },
    {
      name: "description",
      content:
        "Real-world case studies of crypto regulation compliance, enforcement actions, and successful regulatory navigation.",
    },
    {
      name: "keywords",
      content:
        "crypto case studies, regulatory enforcement, compliance examples, fintech case studies",
    },
  ];
}

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  summary: string;
  jurisdiction: string;
  date: string;
  outcome: "success" | "failure" | "ongoing";
  keyTakeaways: string[];
  relatedTags: string[];
  status?: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "coinbase-mica-preparation",
    title: "Coinbase's MiCA Compliance Strategy",
    category: "Regulatory Compliance",
    summary:
      "How Coinbase prepared for MiCA implementation across EU markets, adapting operations to meet new regulatory requirements for crypto asset service providers.",
    jurisdiction: "European Union",
    date: "2024",
    outcome: "success",
    status: "Successfully obtained MiCA authorization",
    keyTakeaways: [
      "Early engagement with regulators reduced implementation friction",
      "Comprehensive AML/KYC overhaul required 18 months of preparation",
      "Consumer protection measures became competitive advantage",
      "Cross-border coordination essential for EU-wide operations",
    ],
    relatedTags: ["MiCA", "Compliance", "EU Regulation", "Exchange"],
  },
  {
    id: "ftx-collapse-regulatory",
    title: "FTX Collapse: Regulatory Lessons Learned",
    category: "Enforcement Action",
    summary:
      "Analysis of regulatory failures and enforcement actions following the FTX collapse, highlighting gaps in oversight and the push for stronger regulations.",
    jurisdiction: "United States",
    date: "2022-2023",
    outcome: "failure",
    status: "Multiple enforcement actions ongoing",
    keyTakeaways: [
      "Inadequate segregation of customer funds led to billions in losses",
      "Regulatory arbitrage through offshore entities delayed oversight",
      "Audit and transparency requirements proven insufficient",
      "Accelerated regulatory clarity post-collapse",
    ],
    relatedTags: ["Enforcement", "SEC", "CFTC", "Exchange", "Consumer Protection"],
  },
  {
    id: "binance-settlement",
    title: "Binance $4.3B Settlement with US Regulators",
    category: "Enforcement Action",
    summary:
      "Comprehensive settlement with DOJ, CFTC, and FinCEN addressing AML violations, unlicensed money transmission, and sanctions compliance failures.",
    jurisdiction: "United States",
    date: "2023",
    outcome: "ongoing",
    status: "Settlement finalized, ongoing compliance monitoring",
    keyTakeaways: [
      "Largest crypto enforcement action in history",
      "Demonstrated consequences of inadequate AML/KYC programs",
      "Leadership accountability emphasized in crypto enforcement",
      "Importance of proactive compliance culture",
    ],
    relatedTags: ["Enforcement", "AML/KYC", "DOJ", "Exchange", "Settlement"],
  },
  {
    id: "uniswap-defi-regulation",
    title: "Uniswap's Approach to DeFi Regulation",
    category: "Regulatory Navigation",
    summary:
      "How Uniswap Labs navigated regulatory uncertainty around DeFi protocols, balancing decentralization with compliance obligations.",
    jurisdiction: "Global",
    date: "2023-2024",
    outcome: "ongoing",
    status: "Active engagement with regulators",
    keyTakeaways: [
      "Decentralized governance complicates regulatory classification",
      "Front-end restrictions as compromise between compliance and decentralization",
      "Geographic blocking of users in certain jurisdictions",
      "Industry collaboration on DeFi regulatory frameworks",
    ],
    relatedTags: ["DeFi", "Regulatory Uncertainty", "Protocol", "Decentralization"],
  },
  {
    id: "circle-usdc-stablecoin",
    title: "Circle's USDC: Compliant Stablecoin Model",
    category: "Regulatory Compliance",
    summary:
      "Circle's strategy for maintaining USDC as a compliant, regulated stablecoin with full reserves and regulatory partnerships.",
    jurisdiction: "United States & Global",
    date: "2020-2024",
    outcome: "success",
    status: "Fully licensed and regulated in multiple jurisdictions",
    keyTakeaways: [
      "Monthly attestation reports build trust and regulatory confidence",
      "Full reserve backing in US Treasuries and cash",
      "State money transmitter licenses in 46 US states",
      "Proactive engagement with EU regulators for MiCA",
    ],
    relatedTags: ["Stablecoins", "Compliance", "Reserves", "MiCA"],
  },
  {
    id: "sushiswap-cftc",
    title: "SushiSwap CFTC Settlement",
    category: "Enforcement Action",
    summary:
      "CFTC action against SushiSwap DAO for offering illegal leveraged/margined commodities, settling for $1.3M without admitting guilt.",
    jurisdiction: "United States",
    date: "2023",
    outcome: "ongoing",
    status: "Settlement completed, precedent set for DAO enforcement",
    keyTakeaways: [
      "DAOs can be held liable for regulatory violations",
      "Offers of illegal trading products trigger enforcement",
      "Settlement allows operation with geographic restrictions",
      "First major enforcement action against a DAO structure",
    ],
    relatedTags: ["DeFi", "DAO", "CFTC", "Enforcement", "Derivatives"],
  },
];

export default function CaseStudies() {
  const getOutcomeIcon = (outcome: CaseStudy["outcome"]) => {
    switch (outcome) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "failure":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "ongoing":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getOutcomeBadge = (outcome: CaseStudy["outcome"]) => {
    const styles = {
      success: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
      failure: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
      ongoing: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[outcome]}`}
      >
        {outcome.charAt(0).toUpperCase() + outcome.slice(1)}
      </span>
    );
  };

  const getCategoryIcon = (category: string) => {
    if (category.includes("Enforcement")) return Shield;
    if (category.includes("Compliance")) return CheckCircle2;
    if (category.includes("Navigation")) return TrendingUp;
    return Briefcase;
  };

  return (
    <PageContainer size="default">
      <PageHeader
        icon={Briefcase}
        title="Case Studies"
        description="Real-world examples of crypto regulatory compliance, enforcement actions, and successful navigation"
      />

      {/* Introduction */}
      <Card className="mb-12">
        <CardContent className="p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">
                Learn from Real-World Regulatory Examples
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our case studies analyze how companies navigate crypto regulation, respond to
                enforcement actions, and implement compliance strategies. Each case provides
                actionable insights for building compliant crypto businesses.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Case Studies Grid */}
      <div className="space-y-6">
        {caseStudies.map((caseStudy) => {
          const CategoryIcon = getCategoryIcon(caseStudy.category);

          return (
            <Card key={caseStudy.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <CategoryIcon className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium text-primary">
                        {caseStudy.category}
                      </span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        {caseStudy.jurisdiction}
                      </span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        {caseStudy.date}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{caseStudy.title}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    {getOutcomeIcon(caseStudy.outcome)}
                    {getOutcomeBadge(caseStudy.outcome)}
                  </div>
                </div>

                {/* Summary */}
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {caseStudy.summary}
                </p>

                {/* Status */}
                {caseStudy.status && (
                  <div className="p-3 bg-muted/50 rounded-lg mb-6">
                    <p className="text-sm">
                      <span className="font-semibold">Current Status:</span>{" "}
                      {caseStudy.status}
                    </p>
                  </div>
                )}

                {/* Key Takeaways */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Key Takeaways
                  </h4>
                  <ul className="space-y-2">
                    {caseStudy.keyTakeaways.map((takeaway, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-primary mt-1">•</span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {caseStudy.relatedTags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/articles?tag=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full text-xs transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/articles?tag=${encodeURIComponent(caseStudy.relatedTags[0])}`}>
                      <FileText className="w-4 h-4 mr-2" />
                      Related Articles
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* CTA Section */}
      <Card className="mt-12">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Stay Updated on Regulatory Developments
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get the latest insights on crypto regulation, enforcement actions, and compliance
            strategies delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gradient-primary text-white">
              <Link to="/articles">
                Browse All Articles
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">
                Request a Case Study
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
