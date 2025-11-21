import type { Route } from "./+types/resources";
import { PageContainer } from "~/components/page-container";
import { PageHeader } from "~/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  BookOpen,
  Calendar,
  FileText,
  Globe,
  Download,
  ExternalLink,
  CheckSquare,
  Scale,
  Building2,
  Shield,
  BookMarked,
  Link2
} from "lucide-react";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resources Hub - InkFrame" },
    {
      name: "description",
      content:
        "Access comprehensive crypto compliance resources including checklists, regulatory calendars, glossaries, and jurisdiction comparisons.",
    },
    {
      name: "keywords",
      content:
        "crypto compliance resources, regulatory calendar, crypto glossary, jurisdiction comparison, compliance checklist",
    },
  ];
}

export default function Resources() {
  const complianceChecklists = [
    {
      id: "mica-wallet",
      title: "MiCA Wallet Provider Checklist",
      description: "Complete compliance checklist for crypto wallet providers under MiCA regulation.",
      items: 25,
      icon: CheckSquare,
    },
    {
      id: "aml-kyc",
      title: "AML/KYC Implementation Guide",
      description: "Step-by-step checklist for implementing AML and KYC procedures.",
      items: 18,
      icon: Shield,
    },
    {
      id: "defi-compliance",
      title: "DeFi Protocol Compliance",
      description: "Regulatory considerations for decentralized finance protocols.",
      items: 15,
      icon: Scale,
    },
  ];

  const regulatoryCalendar = [
    {
      date: "2025-12-30",
      title: "MiCA Final Implementation Deadline",
      jurisdiction: "EU",
      type: "Deadline",
    },
    {
      date: "2026-01-01",
      title: "UK Crypto Asset Regime Goes Live",
      jurisdiction: "UK",
      type: "Effective Date",
    },
    {
      date: "2026-06-30",
      title: "Travel Rule Implementation Deadline",
      jurisdiction: "Global",
      type: "Deadline",
    },
  ];

  const glossaryTerms = [
    { term: "MiCA", definition: "Markets in Crypto-Assets - EU regulatory framework" },
    { term: "AML", definition: "Anti-Money Laundering regulations" },
    { term: "KYC", definition: "Know Your Customer identity verification" },
    { term: "VASP", definition: "Virtual Asset Service Provider" },
    { term: "Travel Rule", definition: "Requirement to share sender/receiver info for crypto transfers" },
  ];

  const jurisdictionComparison = [
    {
      jurisdiction: "European Union",
      framework: "MiCA",
      status: "Active",
      complexity: "High",
      flag: "🇪🇺",
    },
    {
      jurisdiction: "United States",
      framework: "State-by-state",
      status: "Evolving",
      complexity: "Very High",
      flag: "🇺🇸",
    },
    {
      jurisdiction: "United Kingdom",
      framework: "FCA Regime",
      status: "Active",
      complexity: "High",
      flag: "🇬🇧",
    },
    {
      jurisdiction: "Singapore",
      framework: "PSA",
      status: "Active",
      complexity: "Medium",
      flag: "🇸🇬",
    },
  ];

  const officialSources = [
    {
      name: "European Securities and Markets Authority (ESMA)",
      url: "https://www.esma.europa.eu/",
      description: "Official EU securities regulator",
      region: "EU",
    },
    {
      name: "Financial Conduct Authority (FCA)",
      url: "https://www.fca.org.uk/",
      description: "UK financial services regulator",
      region: "UK",
    },
    {
      name: "Securities and Exchange Commission (SEC)",
      url: "https://www.sec.gov/",
      description: "US securities regulator",
      region: "US",
    },
    {
      name: "Monetary Authority of Singapore (MAS)",
      url: "https://www.mas.gov.sg/",
      description: "Singapore's central bank and financial regulator",
      region: "SG",
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        icon={BookOpen}
        title="Resources Hub"
        description="Comprehensive tools, guides, and references for crypto compliance professionals."
      />

      {/* Compliance Checklists Section */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
            <CheckSquare className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Compliance Checklists</h2>
            <p className="text-sm text-muted-foreground mt-1">Downloadable checklists for various compliance requirements</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {complianceChecklists.map((checklist) => {
            const Icon = checklist.icon;
            return (
              <Card key={checklist.id} className="card-modern group hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="px-3 py-1 bg-muted text-xs font-medium rounded-full">
                      {checklist.items} items
                    </span>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {checklist.title}
                  </CardTitle>
                  <CardDescription>{checklist.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full group/btn">
                    <Download className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Regulatory Calendar Section */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Regulatory Calendar</h2>
            <p className="text-sm text-muted-foreground mt-1">Upcoming deadlines and important dates</p>
          </div>
        </div>

        <Card className="card-modern">
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {regulatoryCalendar.map((event, index) => (
                <div key={index} className="p-6 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-medium text-primary">
                          {new Date(event.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                          {event.type}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-1">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Jurisdiction: {event.jurisdiction}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Glossary Section */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
            <BookMarked className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Compliance Glossary</h2>
            <p className="text-sm text-muted-foreground mt-1">Key terms and definitions</p>
          </div>
        </div>

        <Card className="card-modern">
          <CardContent className="p-6">
            <dl className="space-y-4">
              {glossaryTerms.map((item, index) => (
                <div key={index} className="pb-4 border-b border-border last:border-0 last:pb-0">
                  <dt className="font-semibold text-primary mb-1">{item.term}</dt>
                  <dd className="text-muted-foreground">{item.definition}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 pt-6 border-t border-border text-center">
              <Button variant="outline" asChild>
                <Link to="/glossary">
                  View Full Glossary
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Jurisdiction Comparison Section */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Jurisdiction Comparison</h2>
            <p className="text-sm text-muted-foreground mt-1">Compare regulatory frameworks across regions</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Card className="card-modern">
            <CardContent className="p-0">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Jurisdiction</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Framework</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Complexity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {jurisdictionComparison.map((item, index) => (
                    <tr key={index} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{item.flag}</span>
                          <span className="font-medium">{item.jurisdiction}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{item.framework}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                          "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.complexity === "Very High" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                          item.complexity === "High" ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" :
                          "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        }`}>
                          {item.complexity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Official Sources Section */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
            <Link2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Official Sources</h2>
            <p className="text-sm text-muted-foreground mt-1">Links to regulatory authorities and official resources</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {officialSources.map((source, index) => (
            <Card key={index} className="card-modern group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-muted text-xs font-medium rounded">
                        {source.region}
                      </span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors text-lg">
                      {source.name}
                    </CardTitle>
                    <CardDescription className="mt-2">{source.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full group/btn" asChild>
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    Visit Website
                    <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:scale-110 transition-transform" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border border-primary/20 rounded-2xl p-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Need More Resources?</h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          We're constantly adding new compliance tools and resources. Have a suggestion or need specific guidance?
        </p>
        <Button asChild size="lg" className="gradient-primary text-white">
          <Link to="/contact">
            Contact Our Team
            <ExternalLink className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </section>
    </PageContainer>
  );
}
