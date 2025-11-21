import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";
import { ThemeProvider } from "~/lib/theme-context";
import { Button } from "~/components/ui/button";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&display=swap",
  },
  // RSS Feeds
  {
    rel: "alternate",
    type: "application/rss+xml",
    title: "InkFrame RSS Feed",
    href: "/rss.xml",
  },
  {
    rel: "alternate",
    type: "application/atom+xml",
    title: "InkFrame Atom Feed",
    href: "/atom.xml",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = {
                  light: {
                    background: "oklch(0.99 0 0)",
                    foreground: "oklch(0.20 0.02 270)",
                    card: "oklch(0.99 0 0)",
                    cardForeground: "oklch(0.20 0.02 270)",
                    popover: "oklch(0.99 0 0)",
                    popoverForeground: "oklch(0.20 0.02 270)",
                    primary: "oklch(0.45 0.20 265)",
                    primaryForeground: "oklch(0.99 0 0)",
                    secondary: "oklch(0.55 0.18 290)",
                    secondaryForeground: "oklch(0.99 0 0)",
                    muted: "oklch(0.96 0.005 270)",
                    mutedForeground: "oklch(0.50 0.01 270)",
                    accent: "oklch(0.60 0.20 250)",
                    accentForeground: "oklch(0.99 0 0)",
                    destructive: "oklch(0.577 0.245 27.325)",
                    border: "oklch(0.90 0.005 270)",
                    input: "oklch(0.90 0.005 270)",
                    ring: "oklch(0.45 0.20 265)",
                  },
                  dark: {
                    background: "oklch(0.10 0.02 270)",
                    foreground: "oklch(0.98 0.005 270)",
                    card: "oklch(0.16 0.03 270)",
                    cardForeground: "oklch(0.98 0.005 270)",
                    popover: "oklch(0.16 0.03 270)",
                    popoverForeground: "oklch(0.98 0.005 270)",
                    primary: "oklch(0.65 0.25 265)",
                    primaryForeground: "oklch(0.10 0.02 270)",
                    secondary: "oklch(0.70 0.22 290)",
                    secondaryForeground: "oklch(0.10 0.02 270)",
                    muted: "oklch(0.22 0.03 270)",
                    mutedForeground: "oklch(0.70 0.02 270)",
                    accent: "oklch(0.72 0.24 250)",
                    accentForeground: "oklch(0.10 0.02 270)",
                    destructive: "oklch(0.704 0.191 22.216)",
                    border: "oklch(0.22 0.03 270)",
                    input: "oklch(0.22 0.03 270)",
                    ring: "oklch(0.65 0.25 265)",
                  }
                };

                const stored = localStorage.getItem("theme-mode");
                const mode = (stored === "light" || stored === "dark")
                  ? stored
                  : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

                const root = document.documentElement;
                root.classList.add(mode);

                const colors = theme[mode];
                Object.entries(colors).forEach(([key, value]) => {
                  const cssVarName = '--' + key.replace(/([A-Z])/g, "-$1").toLowerCase();
                  root.style.setProperty(cssVarName, value);
                });
              })();
            `,
          }}
        />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;
  let status = 500;

  if (isRouteErrorResponse(error)) {
    status = error.status;
    message = error.status === 404 ? "404 - Page Not Found" : `${error.status} - Error`;
    details =
      error.status === 404
        ? "The page you're looking for doesn't exist. It might have been moved or deleted."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full text-center">
            {/* Error Icon */}
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center">
                <span className="text-6xl font-bold text-destructive">{status === 404 ? "404" : "!"}</span>
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{message}</h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{details}</p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="lg" className="bg-gradient-primary">
                <Link to="/">
                  <span>Go Home</span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/articles">
                  <span>Browse Articles</span>
                </Link>
              </Button>
            </div>

            {/* Stack trace in development */}
            {stack && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground mb-4">
                  Show error details (Development only)
                </summary>
                <pre className="p-4 bg-muted rounded-lg overflow-x-auto text-xs">
                  <code>{stack}</code>
                </pre>
              </details>
            )}

            {/* Helpful Links */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                You might find these helpful:
              </p>
              <div className="flex flex-wrap gap-4 justify-center text-sm">
                <Link to="/compliance" className="text-primary hover:underline">
                  Compliance Hub
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link to="/about" className="text-primary hover:underline">
                  About Us
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link to="/contact" className="text-primary hover:underline">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
