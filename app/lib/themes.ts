export type Theme = {
  id: string;
  name: string;
  description: string;
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
};

type ThemeColors = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  border: string;
  input: string;
  ring: string;
};

export const theme: Theme = {
  id: "midnight-sapphire",
  name: "Midnight Sapphire",
  description: "Deep blue with purple accents",
  colors: {
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
    },
  },
};
