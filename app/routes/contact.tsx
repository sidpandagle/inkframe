import type { Route } from "./+types/contact";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { PageContainer } from "~/components/page-container";
import { PageHeader } from "~/components/page-header";
import { Mail } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact Us - InkFrame" },
    {
      name: "description",
      content:
        "Get in touch with InkFrame. We welcome inquiries, feedback, and collaboration opportunities.",
    },
  ];
}

export default function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement contact form submission logic
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };
    console.log("Contact form submission:", data);
    alert("Thank you for your message! We'll get back to you soon. (This is a demo)");
    e.currentTarget.reset();
  };

  return (
    <PageContainer size="default">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <PageHeader
            icon={Mail}
            title="Contact Us"
            description="Have a question or want to collaborate? We'd love to hear from you."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as
                possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="What is this about?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Your message..."
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Editorial Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  For story pitches, guest post submissions, or editorial
                  collaboration opportunities.
                </p>
                <p className="mt-2 font-medium">editorial@inkframe.com</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business & Partnerships</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  For business inquiries, partnerships, or advertising
                  opportunities.
                </p>
                <p className="mt-2 font-medium">business@inkframe.com</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>General Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  For general questions, feedback, or technical support.
                </p>
                <p className="mt-2 font-medium">hello@inkframe.com</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  InkFrame Media Ltd.<br />
                  123 Regulatory Boulevard<br />
                  Legal District, LD1 2AB<br />
                  United Kingdom
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
