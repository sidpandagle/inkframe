import { Sun, Moon } from "lucide-react";
import { useTheme } from "~/lib/theme-context";

export function ThemeSwitcher() {
  const { themeMode, toggleThemeMode } = useTheme();

  return (
    <button
      onClick={toggleThemeMode}
      className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
      aria-label="Toggle light/dark mode"
    >
      {themeMode === "light" ? (
        <Sun className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
      ) : (
        <Moon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
      )}
    </button>
  );
}
