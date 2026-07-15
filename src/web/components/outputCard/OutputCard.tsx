type OutputCardProps = {
  top: React.ReactNode;
  bottom: React.ReactNode;
};

export function OutputCard({ top, bottom }: OutputCardProps) {
  return (
    <div className="rounded-xl border border-border bg-muted/30 min-h-30">
      <div className="flex flex-col gap-1 p-4 border-b border-border">
        {top}
      </div>
      <div className="flex flex-col gap-1 p-4">{bottom}</div>
    </div>
  );
}
