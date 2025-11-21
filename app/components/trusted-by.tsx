export function TrustedBy() {
  const partners = [
    { name: "CoinDesk", url: "#" },
    { name: "Bloomberg", url: "#" },
    { name: "Reuters", url: "#" },
    { name: "Financial Times", url: "#" },
  ];

  return (
    <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
      <p className="text-sm text-muted-foreground mb-4 font-medium">Trusted by professionals at</p>
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="text-muted-foreground/60 hover:text-foreground transition-colors font-semibold text-base md:text-lg tracking-tight"
          >
            {partner.name}
          </div>
        ))}
      </div>
    </div>
  );
}
