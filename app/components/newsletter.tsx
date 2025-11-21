import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Send, Sparkles } from "lucide-react";

interface NewsletterProps {
  variant?: "default" | "compact";
}

export function Newsletter({ variant = "default" }: NewsletterProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription logic
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    console.log("Newsletter subscription:", email);
    alert("Thanks for subscribing! (This is a demo)");
    e.currentTarget.reset();
  };

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="flex-1"
        />
        <Button type="submit" className="gradient-primary text-white">
          <Send className="w-4 h-4" />
        </Button>
      </form>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl p-10 text-center bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border border-primary/20">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Newsletter</span>
        </div>

        <h3 className="text-3xl font-bold mb-3">Stay Updated</h3>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
          Get the latest insights on crypto regulation, compliance, and legal updates
          delivered directly to your inbox. Join our community of industry professionals.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="flex-1 h-12 px-4 rounded-lg border-2"
          />
          <Button type="submit" size="lg" className="gradient-primary text-white hover:shadow-xl hover:scale-105 transition-smooth">
            <span>Subscribe</span>
            <Send className="w-4 h-4 ml-2" />
          </Button>
        </form>
      </div>
    </div>
  );
}
